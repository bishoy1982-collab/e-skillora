import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, boolean, unique } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  name: text("name").notNull(),
  stripeCustomerId: text("stripe_customer_id"),
  stripeSubscriptionId: text("stripe_subscription_id"),
  subscriptionStatus: text("subscription_status").default("trial"), // trial | active | expired | cancelled | past_due
  trialEndsAt: timestamp("trial_ends_at"),
  planType: text("plan_type"), // "1child" | "2child"
  passwordResetToken: text("password_reset_token"),
  passwordResetExpires: timestamp("password_reset_expires"),
  betaTester: boolean("beta_tester").default(false),
  betaGrantedAt: timestamp("beta_granted_at"),
  trialReminderSent: boolean("trial_reminder_sent").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const sessions = pgTable("app_sessions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  subject: text("subject"),
  grade: integer("grade"),
  topic: text("topic"),
  aiUsedThisSession: boolean("ai_used_this_session").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const childStreaks = pgTable("child_streaks", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  childId: text("child_id").notNull(),
  currentStreak: integer("current_streak").default(0),
  longestStreak: integer("longest_streak").default(0),
  lastPracticeDate: text("last_practice_date"), // YYYY-MM-DD
  updatedAt: timestamp("updated_at").defaultNow(),
}, (t) => [unique("child_streaks_user_child").on(t.userId, t.childId)]);

export const customQuestions = pgTable("custom_questions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  level: text("level").notNull(),
  subject: text("subject").notNull().default("math"), // math | ela
  theme: text("theme"),
  difficulty: text("difficulty").default("medium"),
  type: text("type").notNull().default("input"), // multiple | input
  question: text("question").notNull(),
  options: text("options"), // JSON array string for multiple choice
  answer: text("answer").notNull(),
  hint: text("hint"),
  explanation: text("explanation"),
  overrideId: text("override_id"), // if set, replaces the generated question with this ID
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const appConfig = pgTable("app_config", {
  key: text("key").primaryKey(),
  value: text("value").notNull(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const betaInvites = pgTable("beta_invites", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  grantedAt: timestamp("granted_at").defaultNow(),
});

export const children = pgTable("children", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  name: text("name").notNull(),
  age: integer("age"),
  placedLevel: text("placed_level"),
  floorOverrideApplied: boolean("floor_override_applied").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const waitlistSubmissions = pgTable("waitlist_submissions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  childAge: text("child_age"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  email: true,
  name: true,
}).extend({
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

export const resetPasswordSchema = z.object({
  token: z.string().min(1, "Invalid or expired reset link"),
  newPassword: z.string().min(8, "Password must be at least 8 characters"),
});

export const insertWaitlistSchema = createInsertSchema(waitlistSubmissions).pick({
  name: true, email: true, phone: true, childAge: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Session = typeof sessions.$inferSelect;
export type InsertWaitlist = z.infer<typeof insertWaitlistSchema>;
export type WaitlistSubmission = typeof waitlistSubmissions.$inferSelect;
export type ChildStreak = typeof childStreaks.$inferSelect;
export type CustomQuestion = typeof customQuestions.$inferSelect;
export type AppConfig = typeof appConfig.$inferSelect;
export type Child = typeof children.$inferSelect;
export type BetaInvite = typeof betaInvites.$inferSelect;
