import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

// Check for environment variables
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not defined');
}

// For use in Node.js (backend)
const connectionString = process.env.DATABASE_URL;
const client = postgres(connectionString);
export const db = drizzle(client, { schema });

// Function to close the database connection
export const closeDatabaseConnection = async () => {
  await client.end();
}; 