import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import * as fs from 'fs';
import * as path from 'path';

// Direct reading from .env file to avoid module loading issues
const loadEnv = () => {
  try {
    const envPath = path.resolve(process.cwd(), '.env');
    const content = fs.readFileSync(envPath, 'utf8');
    const envVars = content.split('\n').reduce((acc, line) => {
      const match = line.match(/^([^=]+)=(.*)$/);
      if (match) {
        const key = match[1].trim();
        const value = match[2].trim();
        acc[key] = value;
      }
      return acc;
    }, {} as Record<string, string>);
    
    // Set environment variables
    Object.entries(envVars).forEach(([key, value]) => {
      if (!process.env[key]) {
        process.env[key] = value;
      }
    });
    
    return envVars;
  } catch (error) {
    console.error('Error loading .env file:', error);
    return {};
  }
};

const env = loadEnv();
const databaseUrl = process.env.DATABASE_URL || env.DATABASE_URL;

// Check for database URL
if (!databaseUrl) {
  console.error('DATABASE_URL environment variable is not defined');
  process.exit(1);
}

async function main() {
  console.log('Running migrations...');
  console.log('Using DATABASE_URL:', databaseUrl.replace(/:[^:@]+@/, ':****@')); // Hide password
  
  const connection = postgres(databaseUrl, { max: 1 });
  const db = drizzle(connection);
  
  // This will run migrations on the database, creating tables if they don't exist
  await migrate(db, { migrationsFolder: 'drizzle/migrations' });
  
  console.log('Migrations completed successfully');
  await connection.end();
  process.exit(0);
}

main().catch((error) => {
  console.error('Migration failed:', error);
  process.exit(1);
}); 