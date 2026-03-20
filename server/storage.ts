import {
  type User, type InsertWaitlist, type WaitlistSubmission,
  type Session, type ChildStreak, type Child,
  waitlistSubmissions, users, sessions, childStreaks, children
} from "@shared/schema";
import { db } from "./db";
import { eq, and } from "drizzle-orm";

export interface IStorage {
  upsertChild(data: { userId: string; name: string; age: number; placedLevel: string; floorOverrideApplied: boolean }): Promise<Child>;
  getChildrenByUserId(userId: string): Promise<Child[]>;
  getUserById(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getUserByStripeCustomerId(customerId: string): Promise<User | undefined>;
  getUserByPasswordResetToken(token: string): Promise<User | undefined>;
  createUser(data: { email: string; name: string; passwordHash: string; trialEndsAt?: Date | null }): Promise<User>;
  updateUser(id: string, data: Partial<User>): Promise<User>;
  createSession(data: { userId: string; subject: string; grade: number; topic: string }): Promise<Session>;
  updateSession(id: string, data: Partial<Session>): Promise<Session>;
  createWaitlistSubmission(submission: InsertWaitlist): Promise<WaitlistSubmission>;
  getWaitlistSubmissions(): Promise<WaitlistSubmission[]>;
  getChildStreak(userId: string, childId: string): Promise<ChildStreak | undefined>;
  upsertChildStreak(userId: string, childId: string, todayDate: string): Promise<ChildStreak>;
}

export class DatabaseStorage implements IStorage {
  async getUserById(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email.toLowerCase()));
    return user;
  }

  async getUserByStripeCustomerId(customerId: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.stripeCustomerId, customerId));
    return user;
  }

  async getUserByPasswordResetToken(token: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.passwordResetToken, token));
    return user;
  }

  async createUser(data: { email: string; name: string; passwordHash: string; trialEndsAt?: Date | null }): Promise<User> {
    const [user] = await db.insert(users).values({
      email: data.email.toLowerCase(),
      name: data.name,
      passwordHash: data.passwordHash,
      trialEndsAt: data.trialEndsAt ?? null,
      subscriptionStatus: "pending",
    }).returning();
    return user;
  }

  async updateUser(id: string, data: Partial<User>): Promise<User> {
    const [user] = await db.update(users).set(data).where(eq(users.id, id)).returning();
    return user;
  }

  async createSession(data: { userId: string; subject: string; grade: number; topic: string }): Promise<Session> {
    const [session] = await db.insert(sessions).values(data).returning();
    return session;
  }

  async updateSession(id: string, data: Partial<Session>): Promise<Session> {
    const [session] = await db.update(sessions).set(data).where(eq(sessions.id, id)).returning();
    return session;
  }

  async createWaitlistSubmission(submission: InsertWaitlist): Promise<WaitlistSubmission> {
    const [result] = await db.insert(waitlistSubmissions).values(submission).returning();
    return result;
  }

  async getWaitlistSubmissions(): Promise<WaitlistSubmission[]> {
    return await db.select().from(waitlistSubmissions);
  }

  async getChildStreak(userId: string, childId: string): Promise<ChildStreak | undefined> {
    const [row] = await db.select().from(childStreaks)
      .where(and(eq(childStreaks.userId, userId), eq(childStreaks.childId, childId)));
    return row;
  }

  async upsertChildStreak(userId: string, childId: string, todayDate: string): Promise<ChildStreak> {
    const existing = await this.getChildStreak(userId, childId);
    if (!existing) {
      const [row] = await db.insert(childStreaks).values({
        userId, childId, currentStreak: 1, longestStreak: 1, lastPracticeDate: todayDate,
      }).returning();
      return row;
    }
    const last = existing.lastPracticeDate;
    if (last === todayDate) return existing; // Already practiced today

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().slice(0, 10);

    const newStreak = last === yesterdayStr ? (existing.currentStreak || 0) + 1 : 1;
    const newLongest = Math.max(existing.longestStreak || 0, newStreak);

    const [row] = await db.update(childStreaks)
      .set({ currentStreak: newStreak, longestStreak: newLongest, lastPracticeDate: todayDate, updatedAt: new Date() })
      .where(and(eq(childStreaks.userId, userId), eq(childStreaks.childId, childId)))
      .returning();
    return row;
  }

  async upsertChild(data: { userId: string; name: string; age: number; placedLevel: string; floorOverrideApplied: boolean }): Promise<Child> {
    const [row] = await db.insert(children).values({
      userId: data.userId,
      name: data.name,
      age: data.age,
      placedLevel: data.placedLevel,
      floorOverrideApplied: data.floorOverrideApplied,
    }).onConflictDoUpdate({
      target: [children.userId, children.name, children.age],
      set: { placedLevel: data.placedLevel, floorOverrideApplied: data.floorOverrideApplied },
    }).returning();
    return row;
  }

  async getChildrenByUserId(userId: string): Promise<Child[]> {
    return await db.select().from(children).where(eq(children.userId, userId));
  }
}

export const storage = new DatabaseStorage();
