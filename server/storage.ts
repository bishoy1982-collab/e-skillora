import {
  type User, type InsertWaitlist, type WaitlistSubmission,
  type Session, waitlistSubmissions, users, sessions
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
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
}

export const storage = new DatabaseStorage();
