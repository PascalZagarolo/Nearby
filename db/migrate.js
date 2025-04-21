require('dotenv').config({ path: '.env.local' });
const { drizzle } = require('drizzle-orm/postgres-js');
const { migrate } = require('drizzle-orm/postgres-js/migrator');
const postgres = require('postgres');

// Check for database URL
if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL environment variable is not defined');
  process.exit(1);
}

const runMigration = async () => {
  try {
    console.log('Running migrations...');
    
    const connection = postgres(process.env.DATABASE_URL, { max: 1 });
    const db = drizzle(connection);
    
    await migrate(db, { migrationsFolder: './db/migrations' });
    
    console.log('Migrations completed successfully');
    await connection.end();
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
};

runMigration(); 