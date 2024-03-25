import Link from "next/link"

import {cn} from "@/lib/utils"
import React from "react";
import {signIn, signOut, useSession} from "next-auth/react";

const components: { title: string; href: string; description: string }[] = [
    {
        title: 'Alert Dialog',
        href: '/docs/primitives/alert-dialog',
        description:
            'A modal dialog that interrupts the user with important content and expects a response.',
    },
]

export default function Navbar({className, ...props}: React.HTMLAttributes<HTMLElement>) {

    const {data: session} = useSession();

    return (

        <nav
            className={cn("flex flex-row items-center justify-center space-x-4 lg:space-x-6", className)}
            {...props}
        >
            <Link href={"/"} className="text-lg font-medium transition-colors hover:text-primary">Home</Link>
            {session ? (
                <>
                    <Link
                        href="/dreams"
                        className="text-lg font-medium text-muted-foreground transition-colors hover:text-primary"
                    >
                        Dreams
                    </Link>
                    <Link
                        href="/"
                        className="text-lg font-medium text-muted-foreground transition-colors hover:text-primary"
                    >
                        Something
                    </Link>
                    <Link
                        href="/"
                        className="text-lg font-medium text-muted-foreground transition-colors hover:text-primary"
                    >
                        Settings
                    </Link>
                    <button onClick={() => signOut()}>Sign out</button>
                </>
            ) : (
                <button onClick={() => signIn()}>Sign in</button>
            )}

        </nav>
    )
}