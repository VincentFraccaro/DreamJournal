import { getToken } from 'next-auth/jwt';
import db from "@/app/db/db";
import { dreams } from "@/app/db/schema";
import {eq} from "drizzle-orm";
import {NextRequest, NextResponse} from "next/server";

const secret = process.env.NEXTAUTH_SECRET;

export async function GET(req: NextRequest, res: NextResponse) {
    const token = await getToken({ req, secret });

    if (!token) {
        return NextResponse.json({ error: 'Unauthorized' }, {status: 401});
    }

    // Assuming the token includes the user's email or ID, use it to fetch user-specific data
    const userId = String(token.sub);
    if (!userId) {
        return NextResponse.json({ error: 'User not found' }, {status: 401});
    }

    // Fetch user-specific dreams from the database
    const userDreams = await db.select().from(dreams).where(eq(dreams.userId, userId)).execute();

    return NextResponse.json(userDreams);
}

export async function POST(req: NextRequest, res: NextResponse) {
    const token = await getToken({ req, secret });

    if (!token) {
        return NextResponse.json({ error: 'Unauthorized' }, {status: 401});
    }

    // Assuming the token includes the user's email or ID, use it to fetch user-specific data
    const userId = String(token.sub);
    if (!userId) {
        return NextResponse.json({ error: 'User not found' }, {status: 401});
    }

    const data = await req.json();

    if (data.timestamp && typeof data.timestamp === 'string') {
        data.timestamp = new Date(data.timestamp);
    }

    try {
        const dream = await db.insert(dreams).values({
            userId: userId,
            content: data.content,
            timestamp: data.timestamp, // This should now be a Date object
            isLucid: data.is_lucid,
            title: data.title
        });

        return NextResponse.json(dream);
    } catch (error:any) {
        console.error("Error inserting dream:", error);
        return NextResponse.json({ error: 'Internal Server Error', message: error.message }, { status: 500 });
    }
}

