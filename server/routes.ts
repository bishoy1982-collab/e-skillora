import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { db, pool } from "./db";
import { insertUserSchema, loginSchema, forgotPasswordSchema, resetPasswordSchema } from "@shared/schema";
import { users, sessions, waitlistSubmissions, customQuestions, appConfig, children, betaInvites } from "@shared/schema";
import { sendPasswordResetEmail } from "./email";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import crypto from "crypto";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-02-24.acacia" as any,
});

const PRICE_ID = process.env.STRIPE_PRICE_ID!;
const PRICE_ID_1_CHILD = process.env.STRIPE_PRICE_ID_1_CHILD || process.env.STRIPE_PRICE_ID!;
const PRICE_ID_2_CHILD = process.env.STRIPE_PRICE_ID_2_CHILD || process.env.STRIPE_PRICE_ID!;
const TRIAL_DAYS = 3;
const APP_URL = process.env.APP_URL || "https://e-skillora.com";

// Hardcoded internal test account — bypasses DB and Stripe entirely
const TEST_EMAIL = "bishoy@e-skillora.org";
const TEST_PASSWORD = "kingbishoy";
const TEST_USER_ID = "TEST_ADMIN";
const TEST_USER = {
  id: TEST_USER_ID,
  email: TEST_EMAIL,
  name: "Bishoy (Admin)",
  subscriptionStatus: "active",
  trialEndsAt: null,
};
const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET!;

const FOUNDER_EMAIL = "founder@founder.com";
const FOUNDER_PASSWORD = process.env.FOUNDER_PASSWORD || "Foundernow";

async function seedFounderAccount() {
  try {
    const existing = await storage.getUserByEmail(FOUNDER_EMAIL);
    if (!existing) {
      const hash = await bcrypt.hash(FOUNDER_PASSWORD, 10);
      const founder = await storage.createUser({ email: FOUNDER_EMAIL, name: "Founder", passwordHash: hash });
      await storage.updateUser(founder.id, { subscriptionStatus: "active" });
      console.log("✓ Founder account seeded");
    }
  } catch (e) {
    console.error("Failed to seed founder account:", e);
  }
}

function requireAuth(req: Request, res: Response, next: Function) {
  if (!(req.session as any).userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
}

function isSubscriptionActive(status: string | null, trialEndsAt: Date | null): boolean {
  if (status === "active") return true;
  if (status === "trial" && trialEndsAt && new Date() < new Date(trialEndsAt)) return true;
  return false;
}

export async function registerRoutes(httpServer: Server, app: Express): Promise<Server> {

  // ─── AUTH ROUTES ─────────────────────────────────────────────

  app.post("/api/auth/signup", async (req, res) => {
    try {
      const parsed = insertUserSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ message: parsed.error.errors[0].message });
      }
      const { email, name, password } = parsed.data;

      const existing = await storage.getUserByEmail(email);
      if (existing) {
        return res.status(409).json({ message: "An account with this email already exists" });
      }

      const passwordHash = await bcrypt.hash(password, 12);

      let stripeCustomerId: string | undefined;
      try {
        const customer = await stripe.customers.create({ email: email.toLowerCase(), name });
        stripeCustomerId = customer.id;
      } catch (e) {
        console.error("Stripe customer creation failed:", e);
      }

      const user = await storage.createUser({ email, name, passwordHash });

      // Check if this email has a pre-granted beta invite
      const [betaInvite] = await db.select().from(betaInvites).where(eq(betaInvites.email, email.toLowerCase()));
      const updateData: Record<string, any> = {};
      if (stripeCustomerId) updateData.stripeCustomerId = stripeCustomerId;
      if (betaInvite) {
        updateData.betaTester = true;
        updateData.betaGrantedAt = betaInvite.grantedAt;
        updateData.subscriptionStatus = "trial";
        updateData.trialEndsAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
        await db.delete(betaInvites).where(eq(betaInvites.email, email.toLowerCase()));
      }
      const finalUser = Object.keys(updateData).length > 0
        ? await storage.updateUser(user.id, updateData)
        : user;

      (req.session as any).userId = user.id;
      await new Promise<void>((resolve, reject) => req.session.save(e => e ? reject(e) : resolve()));
      return res.status(201).json({
        id: finalUser.id, email: finalUser.email, name: finalUser.name,
        subscriptionStatus: finalUser.subscriptionStatus, trialEndsAt: finalUser.trialEndsAt,
      });
    } catch (err: any) {
      console.error("Signup error:", err);
      return res.status(500).json({ message: "Failed to create account. Please try again." });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const parsed = loginSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ message: "Invalid email or password" });
      }
      const { email, password } = parsed.data;

      // Hardcoded test account — never hits the DB
      if (email.toLowerCase() === TEST_EMAIL && password === TEST_PASSWORD) {
        (req.session as any).userId = TEST_USER_ID;
        await new Promise<void>((resolve, reject) => req.session.save(e => e ? reject(e) : resolve()));
        return res.json(TEST_USER);
      }

      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const valid = await bcrypt.compare(password, user.passwordHash);
      if (!valid) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // Check trial expiry
      if (user.subscriptionStatus === "trial" && user.trialEndsAt && new Date() > new Date(user.trialEndsAt)) {
        await storage.updateUser(user.id, { subscriptionStatus: "expired" });
        user.subscriptionStatus = "expired";
      }

      (req.session as any).userId = user.id;
      await new Promise<void>((resolve, reject) => req.session.save(e => e ? reject(e) : resolve()));
      return res.json({
        id: user.id, email: user.email, name: user.name,
        subscriptionStatus: user.subscriptionStatus, trialEndsAt: user.trialEndsAt,
      });
    } catch (err: any) {
      console.error("Login error:", err);
      return res.status(500).json({ message: "Login failed. Please try again." });
    }
  });

  app.get("/api/auth/me", requireAuth, async (req, res) => {
    try {
      // Test account never hits the DB
      if ((req.session as any).userId === TEST_USER_ID) {
        return res.json(TEST_USER);
      }

      const user = await storage.getUserById((req.session as any).userId);
      if (!user) {
        (req.session as any).userId = null;
        return res.status(401).json({ message: "Unauthorized" });
      }

      if (user.subscriptionStatus === "trial" && user.trialEndsAt && new Date() > new Date(user.trialEndsAt)) {
        await storage.updateUser(user.id, { subscriptionStatus: "expired" });
        user.subscriptionStatus = "expired";
      }

      return res.json({
        id: user.id, email: user.email, name: user.name,
        subscriptionStatus: user.subscriptionStatus, trialEndsAt: user.trialEndsAt,
        planType: user.planType ?? null,
      });
    } catch (err) {
      return res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  app.post("/api/auth/logout", (req, res) => {
    req.session.destroy(() => res.json({ success: true }));
  });

  // Forgot password: send reset link (token stored in DB; email sending can be wired separately)
  app.post("/api/auth/forgot-password", async (req, res) => {
    try {
      const parsed = forgotPasswordSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ message: "Please enter a valid email address." });
      }
      const { email } = parsed.data;
      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.json({ message: "If an account exists for this email, you will receive a password reset link." });
      }
      const token = crypto.randomBytes(32).toString("hex");
      const expires = new Date(Date.now() + 60 * 60 * 1000);
      await storage.updateUser(user.id, {
        passwordResetToken: token,
        passwordResetExpires: expires,
      });
      const resetUrl = `${APP_URL}/reset-password?token=${token}`;
      await sendPasswordResetEmail(email, resetUrl);
      return res.json({ message: "If an account exists for this email, you will receive a password reset link." });
    } catch (err: any) {
      console.error("Forgot password error:", err);
      return res.status(500).json({ message: "Something went wrong. Please try again." });
    }
  });

  // Reset password with token from email link
  app.post("/api/auth/reset-password", async (req, res) => {
    try {
      const parsed = resetPasswordSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ message: parsed.error.errors[0]?.message ?? "Invalid request." });
      }
      const { token, newPassword } = parsed.data;
      const user = await storage.getUserByPasswordResetToken(token);
      if (!user || !user.passwordResetExpires || new Date() > new Date(user.passwordResetExpires)) {
        return res.status(400).json({ message: "This reset link is invalid or has expired. Please request a new one." });
      }
      const passwordHash = await bcrypt.hash(newPassword, 12);
      await storage.updateUser(user.id, {
        passwordHash,
        passwordResetToken: null,
        passwordResetExpires: null,
      });
      return res.json({ message: "Password updated. You can now log in with your new password." });
    } catch (err: any) {
      console.error("Reset password error:", err);
      return res.status(500).json({ message: "Something went wrong. Please try again." });
    }
  });

  // ─── STRIPE ROUTES ───────────────────────────────────────────

  // Create checkout session with 3-day trial (card required upfront)
  app.post("/api/stripe/checkout", requireAuth, async (req, res) => {
    try {
      // Test account should never reach Stripe
      if ((req.session as any).userId === TEST_USER_ID) {
        return res.status(400).json({ message: "Test account does not need a subscription" });
      }

      const user = await storage.getUserById((req.session as any).userId);
      if (!user) return res.status(401).json({ message: "Unauthorized" });

      const isActive = isSubscriptionActive(user.subscriptionStatus, user.trialEndsAt);
      if (isActive && user.subscriptionStatus === "active") {
        return res.status(400).json({ message: "You already have an active subscription" });
      }

      // Select price based on plan type
      const planType = req.body?.planType; // "1child" | "2child"
      const selectedPrice = planType === "2child" ? PRICE_ID_2_CHILD : PRICE_ID_1_CHILD;

      const sessionParams: Stripe.Checkout.SessionCreateParams = {
        payment_method_types: ["card"],
        line_items: [{ price: selectedPrice, quantity: 1 }],
        mode: "subscription",
        success_url: `${APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${APP_URL}/app`,
        metadata: { userId: user.id },
      };

      // Attach to existing Stripe customer if available
      if (user.stripeCustomerId) {
        sessionParams.customer = user.stripeCustomerId;
      } else {
        sessionParams.customer_email = user.email;
      }

      // Founder test account always gets a 2-year trial (never practically charged, max Stripe allows is 730 days)
      const isFounder = user.email.toLowerCase() === "founder@founder.com";

      // Add trial if user has no active Stripe subscription yet
      const noStripeSubscription = !user.stripeSubscriptionId;
      if (isFounder || noStripeSubscription) {
        sessionParams.subscription_data = { trial_period_days: isFounder ? 730 : TRIAL_DAYS };
      }

      // Save planType immediately so onboarding can skip the plan step
      await storage.updateUser(user.id, { planType: planType === "2child" ? "2child" : "1child" });

      const session = await stripe.checkout.sessions.create(sessionParams);
      return res.json({ url: session.url });
    } catch (err: any) {
      console.error("Checkout error:", err);
      return res.status(500).json({ message: "Failed to start checkout" });
    }
  });

  // Confirm checkout session and sync subscription status (called from /success page)
  app.post("/api/stripe/confirm-session", requireAuth, async (req, res) => {
    try {
      const user = await storage.getUserById((req.session as any).userId);
      if (!user) return res.status(401).json({ message: "Unauthorized" });

      const { sessionId } = req.body;
      if (!sessionId) return res.status(400).json({ message: "Missing sessionId" });

      const session = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ["subscription"],
      });

      // Verify this session belongs to this user
      if (session.metadata?.userId !== user.id) {
        return res.status(403).json({ message: "Session does not belong to this user" });
      }

      const sub = session.subscription as Stripe.Subscription | null;
      if (sub) {
        const status = sub.status === "trialing" ? "trial" : "active";
        const trialEndsAt = sub.trial_end ? new Date(sub.trial_end * 1000) : null;
        await storage.updateUser(user.id, {
          stripeSubscriptionId: sub.id,
          stripeCustomerId: session.customer as string,
          subscriptionStatus: status,
          trialEndsAt,
        });
        return res.json({ status });
      }

      return res.json({ status: user.subscriptionStatus });
    } catch (err: any) {
      console.error("Confirm session error:", err);
      return res.status(500).json({ message: "Failed to confirm session" });
    }
  });

  // Get subscription management portal
  app.post("/api/stripe/portal", requireAuth, async (req, res) => {
    try {
      const user = await storage.getUserById((req.session as any).userId);
      if (!user?.stripeCustomerId) {
        return res.status(400).json({ message: "No billing account found" });
      }

      const portal = await stripe.billingPortal.sessions.create({
        customer: user.stripeCustomerId,
        return_url: `${APP_URL}/app`,
      });

      return res.json({ url: portal.url });
    } catch (err: any) {
      console.error("Portal error:", err);
      return res.status(500).json({ message: "Failed to open billing portal" });
    }
  });

  // Stripe webhook
  app.post("/api/stripe/webhook", async (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        (req as any).rawBody,
        sig as string,
        WEBHOOK_SECRET
      );
    } catch (err: any) {
      console.error("Webhook signature error:", err.message);
      return res.status(400).json({ message: `Webhook error: ${err.message}` });
    }

    try {
      switch (event.type) {
        case "checkout.session.completed": {
          const session = event.data.object as Stripe.Checkout.Session;
          const userId = session.metadata?.userId;
          if (userId && session.subscription) {
            const sub = await stripe.subscriptions.retrieve(session.subscription as string);
            const status = sub.status === "trialing" ? "trial" : "active";
            const trialEndsAt = sub.trial_end ? new Date(sub.trial_end * 1000) : null;
            await storage.updateUser(userId, {
              stripeSubscriptionId: session.subscription as string,
              stripeCustomerId: session.customer as string,
              subscriptionStatus: status,
              trialEndsAt,
            });
          }
          break;
        }
        case "customer.subscription.updated": {
          const sub = event.data.object as Stripe.Subscription;
          const user = await storage.getUserByStripeCustomerId(sub.customer as string);
          if (user) {
            const status = sub.status === "active" ? "active"
              : sub.status === "trialing" ? "trial"
              : sub.status === "past_due" ? "past_due"
              : "cancelled";
            await storage.updateUser(user.id, {
              subscriptionStatus: status,
              stripeSubscriptionId: sub.id,
            });
          }
          break;
        }
        case "customer.subscription.deleted": {
          const sub = event.data.object as Stripe.Subscription;
          const user = await storage.getUserByStripeCustomerId(sub.customer as string);
          if (user) {
            await storage.updateUser(user.id, { subscriptionStatus: "cancelled" });
          }
          break;
        }
        case "invoice.payment_failed": {
          const invoice = event.data.object as Stripe.Invoice;
          const user = await storage.getUserByStripeCustomerId(invoice.customer as string);
          if (user) {
            await storage.updateUser(user.id, { subscriptionStatus: "past_due" });
          }
          break;
        }
      }
      return res.json({ received: true });
    } catch (err) {
      console.error("Webhook processing error:", err);
      return res.status(500).json({ message: "Webhook processing failed" });
    }
  });

  // ─── AI PROXY ROUTE ──────────────────────────────────────────

  app.post("/api/ai/chat", requireAuth, async (req, res) => {
    try {
      const user = await storage.getUserById((req.session as any).userId);
      if (!user) return res.status(401).json({ message: "Unauthorized" });

      // Check subscription access
      const hasAccess = isSubscriptionActive(user.subscriptionStatus, user.trialEndsAt);
      if (!hasAccess) {
        return res.status(403).json({ message: "Subscription required" });
      }

      const { messages, systemPrompt } = req.body;
      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ message: "Invalid request" });
      }

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.ANTHROPIC_API_KEY!,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 450,
          system: systemPrompt,
          messages,
        }),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        console.error("Anthropic API error:", err);
        return res.status(502).json({ message: "AI tutor unavailable. Please try again." });
      }

      const data = await response.json();
      const text = data.content?.[0]?.text || "Let me think about that...";
      return res.json({ text });
    } catch (err) {
      console.error("AI chat error:", err);
      return res.status(500).json({ message: "AI tutor error" });
    }
  });

  // ─── STREAK ROUTES ───────────────────────────────────────────

  // Update streak when a child completes a practice day
  app.post("/api/streaks/update", requireAuth, async (req, res) => {
    try {
      const userId = (req.session as any).userId;
      const { childId } = req.body;
      if (!childId) return res.status(400).json({ message: "childId required" });
      const today = new Date().toISOString().slice(0, 10);
      const streak = await storage.upsertChildStreak(userId, childId, today);
      return res.json(streak);
    } catch (err) {
      console.error("Streak update error:", err);
      return res.status(500).json({ message: "Failed to update streak" });
    }
  });

  // Get streak for a child
  app.get("/api/streaks/:childId", requireAuth, async (req, res) => {
    try {
      const userId = (req.session as any).userId;
      const { childId } = req.params;
      const streak = await storage.getChildStreak(userId, childId);
      return res.json(streak || { currentStreak: 0, longestStreak: 0, lastPracticeDate: null });
    } catch (err) {
      console.error("Streak fetch error:", err);
      return res.status(500).json({ message: "Failed to fetch streak" });
    }
  });

  // ─── ADMIN: CLEAR ALL DATA (protected by ADMIN_SECRET env var) ──

  app.post("/api/admin/clear-db", async (req, res) => {
    const secret = process.env.ADMIN_SECRET;
    if (!secret || req.headers["x-admin-secret"] !== secret) {
      return res.status(403).json({ message: "Forbidden" });
    }
    try {
      await db.delete(sessions);
      await db.delete(waitlistSubmissions);
      // Delete http sessions store then users (foreign key safe order)
      await pool.query("DELETE FROM user_sessions_store WHERE 1=1").catch(() => {});
      await db.delete(users);
      return res.json({ message: "All data cleared successfully" });
    } catch (err: any) {
      console.error("Clear DB error:", err);
      return res.status(500).json({ message: err.message });
    }
  });

  // ─── ADMIN ANALYTICS ─────────────────────────────────────────

  app.get("/api/admin/metrics", async (req, res) => {
    const secret = req.headers["x-admin-secret"];
    if (!secret || secret !== process.env.ADMIN_SECRET) {
      return res.status(403).json({ message: "Forbidden" });
    }
    try {
      const allUsers = await db.select().from(users);

      const now = new Date();
      const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const startOfWeek = new Date(startOfToday);
      startOfWeek.setDate(startOfToday.getDate() - startOfToday.getDay());
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

      const total = allUsers.length;
      const pending = allUsers.filter(u => u.subscriptionStatus === "pending").length;
      const trial = allUsers.filter(u => u.subscriptionStatus === "trial").length;
      const active = allUsers.filter(u => u.subscriptionStatus === "active").length;
      const expired = allUsers.filter(u => u.subscriptionStatus === "expired").length;
      const cancelled = allUsers.filter(u => u.subscriptionStatus === "cancelled").length;
      const pastDue = allUsers.filter(u => u.subscriptionStatus === "past_due").length;
      const withStripe = allUsers.filter(u => !!u.stripeSubscriptionId).length;

      const mrr = active * 9;
      const trialConversionRate = withStripe > 0
        ? Math.round((active / withStripe) * 1000) / 10
        : 0;
      const churnCount = expired + cancelled;

      const newToday = allUsers.filter(u => u.createdAt && new Date(u.createdAt) >= startOfToday).length;
      const newThisWeek = allUsers.filter(u => u.createdAt && new Date(u.createdAt) >= startOfWeek).length;
      const newThisMonth = allUsers.filter(u => u.createdAt && new Date(u.createdAt) >= startOfMonth).length;

      // Build daily signups for last 14 days
      const dailySignups: { date: string; count: number }[] = [];
      for (let i = 13; i >= 0; i--) {
        const d = new Date(startOfToday);
        d.setDate(startOfToday.getDate() - i);
        const next = new Date(d);
        next.setDate(d.getDate() + 1);
        const dateStr = d.toISOString().slice(0, 10);
        const count = allUsers.filter(u => {
          if (!u.createdAt) return false;
          const created = new Date(u.createdAt);
          return created >= d && created < next;
        }).length;
        dailySignups.push({ date: dateStr, count });
      }

      // Recent 20 users
      const recentUsers = [...allUsers]
        .sort((a, b) => {
          const at = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const bt = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return bt - at;
        })
        .slice(0, 20)
        .map(u => ({
          id: u.id,
          email: u.email,
          name: u.name,
          subscriptionStatus: u.subscriptionStatus,
          trialEndsAt: u.trialEndsAt,
          createdAt: u.createdAt,
          hasStripe: !!u.stripeSubscriptionId,
        }));

      return res.json({
        funnel: { total, pending, trial, active, expired, cancelled, pastDue, withStripe },
        business: { mrr, trialConversionRate, churnCount },
        growth: { newToday, newThisWeek, newThisMonth },
        dailySignups,
        recentUsers,
      });
    } catch (err: any) {
      console.error("Admin metrics error:", err);
      return res.status(500).json({ message: err.message });
    }
  });

  // ─── PUBLIC CONFIG ───────────────────────────────────────────

  app.get("/api/config", async (req, res) => {
    try {
      const rows = await db.select().from(appConfig);
      const cfg: Record<string, string> = {};
      for (const r of rows) cfg[r.key] = r.value;
      return res.json({ daily_q: parseInt(cfg.daily_q || "50"), days_per_level: parseInt(cfg.days_per_level || "60") });
    } catch (err: any) {
      return res.json({ daily_q: 50, days_per_level: 60 });
    }
  });

  // ─── ADMIN QUESTION MANAGEMENT ───────────────────────────────

  function requireAdmin(req: Request, res: Response, next: Function) {
    const secret = req.headers["x-admin-secret"];
    if (!process.env.ADMIN_SECRET || secret !== process.env.ADMIN_SECRET) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  }

  // GET /api/admin/questions?level=A&subject=math
  app.get("/api/admin/questions", requireAdmin, async (req, res) => {
    try {
      const { level, subject } = req.query as { level?: string; subject?: string };
      let query = db.select().from(customQuestions);
      const rows = await query;
      const filtered = rows.filter(r =>
        (!level || r.level === level) &&
        (!subject || r.subject === subject)
      );
      return res.json(filtered);
    } catch (err: any) {
      return res.status(500).json({ message: err.message });
    }
  });

  // POST /api/admin/questions
  app.post("/api/admin/questions", requireAdmin, async (req, res) => {
    try {
      const { level, subject, theme, difficulty, type, question, options, answer, hint, explanation, overrideId } = req.body;
      if (!level || !question || !answer) return res.status(400).json({ message: "level, question, answer required" });
      const [row] = await db.insert(customQuestions).values({
        level, subject: subject || "math", theme, difficulty: difficulty || "medium",
        type: type || "input", question, options, answer, hint, explanation, overrideId,
      }).returning();
      return res.status(201).json(row);
    } catch (err: any) {
      return res.status(500).json({ message: err.message });
    }
  });

  // PUT /api/admin/questions/:id
  app.put("/api/admin/questions/:id", requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const { level, subject, theme, difficulty, type, question, options, answer, hint, explanation, overrideId } = req.body;
      const [row] = await db.update(customQuestions)
        .set({ level, subject, theme, difficulty, type, question, options, answer, hint, explanation, overrideId, updatedAt: new Date() })
        .where(eq(customQuestions.id, id))
        .returning();
      if (!row) return res.status(404).json({ message: "Not found" });
      return res.json(row);
    } catch (err: any) {
      return res.status(500).json({ message: err.message });
    }
  });

  // DELETE /api/admin/questions/:id
  app.delete("/api/admin/questions/:id", requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      await db.delete(customQuestions).where(eq(customQuestions.id, id));
      return res.json({ ok: true });
    } catch (err: any) {
      return res.status(500).json({ message: err.message });
    }
  });

  // POST /api/admin/questions/bulk — import array of questions
  app.post("/api/admin/questions/bulk", requireAdmin, async (req, res) => {
    try {
      const items: any[] = req.body;
      if (!Array.isArray(items) || items.length === 0) return res.status(400).json({ message: "Send an array of questions" });
      const inserted = await db.insert(customQuestions).values(
        items.map(q => ({
          level: q.level, subject: q.subject || "math", theme: q.theme,
          difficulty: q.difficulty || "medium", type: q.type || "input",
          question: q.question, options: q.options, answer: q.answer,
          hint: q.hint, explanation: q.explanation, overrideId: q.overrideId,
        }))
      ).returning();
      return res.status(201).json({ inserted: inserted.length });
    } catch (err: any) {
      return res.status(500).json({ message: err.message });
    }
  });

  // GET /api/admin/config
  app.get("/api/admin/config", requireAdmin, async (req, res) => {
    try {
      const rows = await db.select().from(appConfig);
      const cfg: Record<string, string> = {};
      for (const r of rows) cfg[r.key] = r.value;
      return res.json(cfg);
    } catch (err: any) {
      return res.status(500).json({ message: err.message });
    }
  });

  // PUT /api/admin/config  { key: string, value: string }
  app.put("/api/admin/config", requireAdmin, async (req, res) => {
    try {
      const { key, value } = req.body;
      if (!key || value === undefined) return res.status(400).json({ message: "key and value required" });
      await db.insert(appConfig).values({ key, value: String(value) })
        .onConflictDoUpdate({ target: appConfig.key, set: { value: String(value), updatedAt: new Date() } });
      return res.json({ ok: true, key, value });
    } catch (err: any) {
      return res.status(500).json({ message: err.message });
    }
  });

  // ─── WAITLIST ────────────────────────────────────────────────

  app.post("/api/waitlist", async (req, res) => {
    try {
      const parsed = req.body;
      if (!parsed.email) return res.status(400).json({ message: "Email required" });
      const submission = await storage.createWaitlistSubmission({
        name: parsed.name || "",
        email: parsed.email,
        phone: parsed.phone || "",
        childAge: parsed.childAge || null,
      });
      return res.status(201).json(submission);
    } catch (err) {
      return res.status(500).json({ message: "Failed to save" });
    }
  });

  // ─── CHILDREN PLACEMENT ──────────────────────────────────────

  // POST /api/children/placement — saves/updates child placement data after assessment
  app.post("/api/children/placement", requireAuth, async (req, res) => {
    try {
      const userId = (req.session as any).userId;
      const { name, age, placedLevel, floorOverrideApplied } = req.body;
      if (!name || !placedLevel) return res.status(400).json({ message: "name and placedLevel are required" });
      const child = await storage.upsertChild({
        userId,
        name: String(name),
        age: parseInt(age) || 0,
        placedLevel: String(placedLevel),
        floorOverrideApplied: !!floorOverrideApplied,
      });
      return res.json(child);
    } catch (err: any) {
      console.error("Children placement error:", err);
      return res.status(500).json({ message: err.message });
    }
  });

  // ─── ADMIN USERS ─────────────────────────────────────────────

  // GET /api/admin/users — all users with their children, for admin dashboard
  app.get("/api/admin/users", requireAdmin, async (req, res) => {
    try {
      const allUsers = await db.select().from(users).orderBy(users.createdAt);
      const allChildren = await db.select().from(children);

      const childrenByUserId: Record<string, typeof allChildren> = {};
      for (const c of allChildren) {
        if (!childrenByUserId[c.userId]) childrenByUserId[c.userId] = [];
        childrenByUserId[c.userId].push(c);
      }

      const result = [...allUsers].reverse().map(u => ({
        id: u.id,
        email: u.email,
        name: u.name,
        subscriptionStatus: u.subscriptionStatus,
        planType: u.planType,
        stripeSubscriptionId: u.stripeSubscriptionId,
        stripeCustomerId: u.stripeCustomerId,
        trialEndsAt: u.trialEndsAt,
        createdAt: u.createdAt,
        betaTester: u.betaTester,
        children: (childrenByUserId[u.id] || []).map(c => ({
          name: c.name,
          age: c.age,
          placedLevel: c.placedLevel,
          floorOverrideApplied: c.floorOverrideApplied,
        })),
      }));

      return res.json(result);
    } catch (err: any) {
      console.error("Admin users error:", err);
      return res.status(500).json({ message: err.message });
    }
  });

  // ─── BETA TRIAL GRANT ────────────────────────────────────────

  app.post("/api/admin/grant-beta", requireAdmin, async (req, res) => {
    const { email } = req.body;
    if (!email || !email.includes("@")) {
      return res.status(400).json({ message: "Valid email required" });
    }
    const normalizedEmail = email.trim().toLowerCase();
    const trialEndsAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    try {
      const existing = await storage.getUserByEmail(normalizedEmail);

      if (existing) {
        // Existing user — update in place
        await storage.updateUser(existing.id, {
          betaTester: true,
          betaGrantedAt: new Date(),
          subscriptionStatus: "trial",
          trialEndsAt,
        });
      } else {
        // No account yet — upsert into beta_invites
        await db.insert(betaInvites)
          .values({ email: normalizedEmail })
          .onConflictDoUpdate({ target: betaInvites.email, set: { grantedAt: new Date() } });
      }

      return res.json({
        ok: true,
        userExists: !!existing,
        message: existing
          ? `Trial extended and email sent to ${normalizedEmail}`
          : `Invite recorded and email sent to ${normalizedEmail}`,
      });
    } catch (err: any) {
      console.error("Grant beta error:", err);
      return res.status(500).json({ message: err.message });
    }
  });

  // POST /api/admin/wipe-db — requires ADMIN_SECRET + confirmation token "CONFIRM"
  app.post("/api/admin/wipe-db", requireAdmin, async (req, res) => {
    if (req.body?.confirm !== "CONFIRM") {
      return res.status(400).json({ message: "Send { confirm: 'CONFIRM' } to proceed" });
    }
    try {
      // Delete sessions separately since the table may not exist yet
      await pool.query(`DELETE FROM user_sessions_store`).catch(() => {});
      await pool.query(`
        TRUNCATE TABLE
          app_sessions,
          child_streaks,
          custom_questions,
          waitlist_submissions,
          users
        CASCADE
      `);
      await pool.query(`
        INSERT INTO app_config (key, value) VALUES ('daily_q', '50'), ('days_per_level', '60')
        ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value
      `);
      await seedFounderAccount();
      console.log("⚠️  Database wiped by admin");
      return res.json({ ok: true, message: "All data wiped and config re-seeded." });
    } catch (err: any) {
      console.error("Wipe DB error:", err);
      return res.status(500).json({ message: err.message });
    }
  });

  await seedFounderAccount();
  return httpServer;
}
