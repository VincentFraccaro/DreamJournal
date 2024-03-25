import NextAuth from "next-auth"

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: {
            /** The user's postal address. */
            id: string,
            name: string | null,
            email: string,
            emailVerified: Date | null,
            image: string | null,
        }
    }
    interface SignIn {
        user: {
            /** The user's postal address. */
            id: string,
            name: string | null,
            email: string,
            emailVerified: Date | null,
            image: string | null,
        }
    }
}