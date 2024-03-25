import * as dotenv from 'dotenv';
import type { Config } from 'drizzle-kit';

dotenv.config({
    path: '.env'
})
export default {
    schema: './src/app/db/schema.ts',
    out: './src/app/data/migrations',
    driver: 'pg',
    dbCredentials: {
        connectionString: process.env.PGURL!,
    },
} satisfies Config;