import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { db, pool } from "./db";
import { insertUserSchema, loginSchema, forgotPasswordSchema, resetPasswordSchema } from "@shared/schema";
import { users, sessions, waitlistSubmissions } from "@shared/schema";
import bcrypt from "bcrypt";
import crypto from "crypto";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-02-24.acacia" as any,
});

const PRICE_ID = process.env.STRIPE_PRICE_ID!;
const TRIAL_DAYS = 3;
const APP_URL = process.env.APP_URL || "https://e-skillora.com";
const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET!;

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
      const trialEndsAt = new Date(Date.now() + TRIAL_DAYS * 24 * 60 * 60 * 1000);

      let stripeCustomerId: string | undefined;
      try {
        const customer = await stripe.customers.create({ email: email.toLowerCase(), name });
        stripeCustomerId = customer.id;
      } catch (e) {
        console.error("Stripe customer creation failed:", e);
      }

      const user = await storage.createUser({ email, name, passwordHash, trialEndsAt });
      if (stripeCustomerId) {
        await storage.updateUser(user.id, { stripeCustomerId });
      }

      (req.session as any).userId = user.id;
      return res.status(201).json({
        id: user.id, email: user.email, name: user.name,
        subscriptionStatus: user.subscriptionStatus, trialEndsAt: user.trialEndsAt,
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
      // TODO: send email with resetUrl (e.g. SendGrid, Resend, nodemailer). For now log in dev.
      if (process.env.NODE_ENV !== "production") {
        console.log("[dev] Password reset link:", resetUrl);
      }
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
      const user = await storage.getUserById((req.session as any).userId);
      if (!user) return res.status(401).json({ message: "Unauthorized" });

      const isActive = isSubscriptionActive(user.subscriptionStatus, user.trialEndsAt);
      if (isActive && user.subscriptionStatus === "active") {
        return res.status(400).json({ message: "You already have an active subscription" });
      }

      const sessionParams: Stripe.Checkout.SessionCreateParams = {
        payment_method_types: ["card"],
        line_items: [{ price: PRICE_ID, quantity: 1 }],
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

      // Only add trial if user hasn't trialed before
      if (user.subscriptionStatus === "trial" || user.subscriptionStatus === "expired") {
        sessionParams.subscription_data = {
          trial_period_days: user.subscriptionStatus === "trial" ? TRIAL_DAYS : 0,
        };
      }

      const session = await stripe.checkout.sessions.create(sessionParams);
      return res.json({ url: session.url });
    } catch (err: any) {
      console.error("Checkout error:", err);
      return res.status(500).json({ message: "Failed to start checkout" });
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
            await storage.updateUser(userId, {
              stripeSubscriptionId: session.subscription as string,
              stripeCustomerId: session.customer as string,
              subscriptionStatus: "active",
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
          max_tokens: 220,
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

  return httpServer;
}
