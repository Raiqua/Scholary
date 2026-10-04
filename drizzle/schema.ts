import {
  boolean,
  decimal,
  int,
  mysqlEnum,
  mysqlTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

export const profiles = mysqlTable("profiles", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId")
    .notNull()
    .references(() => users.id),
  name: varchar("name", { length: 120 }).notNull(),
  ageRange: varchar("ageRange", { length: 32 }),
  state: varchar("state", { length: 2 }),
  isDependent: boolean("isDependent").default(false).notNull(),
  isDemo: boolean("isDemo").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const hustles = mysqlTable("hustles", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId")
    .notNull()
    .references(() => users.id),
  name: varchar("name", { length: 120 }).notNull(),
  icon: varchar("icon", { length: 8 }).notNull(),
  color: varchar("color", { length: 16 }).notNull(),
  hourlyGoal: decimal("hourlyGoal", { precision: 10, scale: 2 }),
  archived: boolean("archived").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const incomeEntries = mysqlTable("income_entries", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId")
    .notNull()
    .references(() => users.id),
  hustleId: int("hustleId").references(() => hustles.id),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  currency: varchar("currency", { length: 3 }).default("USD").notNull(),
  source: varchar("source", { length: 160 }).notNull(),
  date: varchar("date", { length: 16 }).notNull(),
  type: mysqlEnum("type", ["income", "expense"]).notNull(),
  hours: decimal("hours", { precision: 6, scale: 2 }),
  confidence: decimal("confidence", { precision: 4, scale: 3 }),
  origin: mysqlEnum("origin", [
    "screenshot",
    "email",
    "voice",
    "manual",
  ]).notNull(),
  evidenceUrl: text("evidenceUrl"),
  verified: boolean("verified").default(false).notNull(),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const goals = mysqlTable("goals", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId")
    .notNull()
    .references(() => users.id),
  name: varchar("name", { length: 160 }).notNull(),
  mode: mysqlEnum("mode", ["save", "earn"]).notNull(),
  targetAmount: decimal("targetAmount", { precision: 10, scale: 2 }).notNull(),
  savedAmount: decimal("savedAmount", { precision: 10, scale: 2 })
    .default("0")
    .notNull(),
  deadline: varchar("deadline", { length: 16 }),
  imageUrl: text("imageUrl"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const taxJarTransfers = mysqlTable("tax_jar_transfers", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId")
    .notNull()
    .references(() => users.id),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  date: varchar("date", { length: 16 }).notNull(),
  note: varchar("note", { length: 240 }),
});

export const proofLinks = mysqlTable("proof_links", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId")
    .notNull()
    .references(() => users.id),
  dateRange: varchar("dateRange", { length: 80 }).notNull(),
  includedHustleIds: text("includedHustleIds").notNull(),
  signedToken: varchar("signedToken", { length: 160 }).notNull().unique(),
  expiresAt: timestamp("expiresAt").notNull(),
  revoked: boolean("revoked").default(false).notNull(),
});

export type Profile = typeof profiles.$inferSelect;
export type Hustle = typeof hustles.$inferSelect;
export type IncomeEntry = typeof incomeEntries.$inferSelect;
export type Goal = typeof goals.$inferSelect;
export type TaxJarTransfer = typeof taxJarTransfers.$inferSelect;
export type ProofLink = typeof proofLinks.$inferSelect;
