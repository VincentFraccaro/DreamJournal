import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import {users} from "@/app/db/schema";
import db from "@/app/db/db";
import {eq} from "drizzle-orm";
import {timestamp} from "drizzle-orm/pg-core";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: String(process.env.GOOGLE_CLIENT_ID),
            clientSecret: String(process.env.GOOGLE_CLIENT_SECRET),
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        })
    ],
    callbacks: {
        async signIn({user, account, profile}) {
            const userExists = await db.query.users.findFirst({

            })
            if (!userExists) {
                console.log(user);
                let now = new Date().toISOString()
                // User does not exist, create a new user
                await db.insert(users).values({
                    id: user.id, // You might need to generate this ID based on your database requirements
                    name: user.name,
                    email: user.email,
                    image: user.image,
                });
            }
            return true;
        },

        async session({ session }) {
            const userInfos = await db.select().from(users).where(eq(users.email, String(session.user?.email)));
            session.user = userInfos[0];
            console.log(session);
            return session;
        }
    }
})

export { handler as GET, handler as POST };