# Database Setup with Drizzle ORM

This project uses Drizzle ORM with PostgreSQL hosted on Supabase for database operations.

## Setup Instructions

1. Create a `.env` file in the root directory with your PostgreSQL connection string:
   ```
   DATABASE_URL=postgres://postgres:password@localhost:5432/fiverr_clone
   ```
   If using Supabase, it would look like:
   ```
   DATABASE_URL=postgres://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Generate migration files:
   ```
   npm run db:generate
   ```

4. Apply migrations to database:
   ```
   npm run db:migrate
   ```

5. (Optional) Launch Drizzle Studio to view and manage your database:
   ```
   npm run db:studio
   ```

## Database Schema

The schema includes the following tables:

- **users**: User accounts (regular users, service providers, and admins)
- **service_providers**: Extended profiles for service providers
- **categories**: Service categories
- **services**: Services offered by providers
- **orders**: Orders placed by users
- **reviews**: Reviews for services
- **messages**: Private messages between users
- **payments**: Payment records for orders

## Relationships

- User to Service Provider: One-to-one
- Service Provider to Services: One-to-many
- Services to Categories: Many-to-one
- Users to Orders: One-to-many
- Services to Orders: One-to-many
- Users to Reviews: One-to-many
- Services to Reviews: One-to-many 