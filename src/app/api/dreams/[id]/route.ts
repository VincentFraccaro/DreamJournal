// pages/api/dreams/[id].js

import {dreams, Dreams} from "@/app/db/schema";
import {NextRequest, NextResponse} from "next/server";
import db from "@/app/db/db";
import {eq} from "drizzle-orm";
const GET = async (req: NextRequest, {params}: {params: {id: number}}) => {

    console.log(params.id)

    const result = await db.select().from(dreams).where(eq(dreams.id, params.id));
    return NextResponse.json(result);


}

const DELETE = async (req: NextRequest, {params}: {params: {id: number}}) => {

    const result = await db.delete(dreams).where(eq(dreams.id, params.id));
    return NextResponse.json(result);
}

export {GET, DELETE}