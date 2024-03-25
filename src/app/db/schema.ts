import { integer, pgSchema, serial, text, varchar, boolean, timestamp, primaryKey, pgTable } from "drizzle-orm/pg-core";
import { InferSelectModel } from "drizzle-orm";
import type { AdapterAccount } from '@auth/core/adapters';

export const mSchema = pgSchema("my_schema");

export const users = mSchema.table("user", {
    id: text("id").notNull().primaryKey(),
    name: text("name"),
    email: text("email").notNull(),
    emailVerified: timestamp("emailVerified", { mode: "date" }),
    image: text("image"),
});

export const sessions = mSchema.table("session", {
    sessionToken: text("sessionToken").notNull().primaryKey(),
    userId: text("userId")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = mSchema.table(
    "verificationToken",
    {
        identifier: text("identifier").notNull(),
        token: text("token").notNull(),
        expires: timestamp("expires", { mode: "date" }).notNull(),
    },
    (vt) => ({
        compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
    })
);

export const accounts = mSchema.table(
    "account",
    {
        userId: text("userId")
            .notNull()
            .references(() => users.id, { onDelete: "cascade" }),
        type: text("type").$type<AdapterAccount["type"]>().notNull(),
        provider: text("provider").notNull(),
        providerAccountId: text("providerAccountId").notNull(),
        refresh_token: text("refresh_token"),
        access_token: text("access_token"),
        expires_at: integer("expires_at"),
        token_type: text("token_type"),
        scope: text("scope"),
        id_token: text("id_token"),
        session_state: text("session_state"),
    },
    (account) => ({
        compoundKey: primaryKey({ columns: [account.provider, account.providerAccountId] }),
    })
);

export const dreams = mSchema.table('dreams', {
    id: serial('id').primaryKey(),
    userId: text('user_id').references(() => users.id),
    title: text('title'),
    timestamp: timestamp('timestamp'),
    content: text('content'),
    isLucid: boolean('is_lucid'),
});

export type Users = InferSelectModel<typeof users>;
export type Sessions = InferSelectModel<typeof sessions>;
export type VerificationTokens = InferSelectModel<typeof verificationTokens>;
export type Accounts = InferSelectModel<typeof accounts>;
export type Dreams = InferSelectModel<typeof dreams>;