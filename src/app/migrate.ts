// app/migrate.ts
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { migrate } from "drizzle-orm/neon-http/migrator";
import { config } from "dotenv";

config({ path: ".env" });

const sql = neon(process.env.PGURL!);
const db = drizzle(sql);
const main = async () => {
    try {
        await migrate(db, { migrationsFolder: "./src/app/data/migrations" });
        console.log("Migration completed");
    } catch (error) {
        console.error("Error during migration:", error);
        process.exit(1);
    }
};

main();