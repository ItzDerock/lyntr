import { config } from 'dotenv';
import type { Config } from 'drizzle-kit';

config({ path: '.env' });

if (!process.env.DATABASE_URL) {
	throw new Error('Missing database credentials in environment variables');
}

export default {
	schema: './src/lib/server/schema.ts',
	out: './drizzle',
	dialect: 'postgresql', // 'postgresql' | 'mysql' | 'sqlite'
	dbCredentials: {
		url: process.env.DATABASE_URL!
	}
} satisfies Config;
