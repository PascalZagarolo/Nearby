# Database Setup with Drizzle ORM and Supabase PostgreSQL

This project uses Drizzle ORM with PostgreSQL hosted on Supabase for database operations.

## Configuration

1. Create a `.env.local` file in the root directory with the following content:

```env
# PostgreSQL Supabase Database URL
DATABASE_URL="postgres://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres"
```

Replace `[YOUR-PASSWORD]` and `[YOUR-PROJECT-REF]` with your actual Supabase credentials.

## Database Schema

The database schema includes the following tables:

- `users`: User accounts (regular users, service providers, and admins)
- `service_providers`: Extended profiles for service providers
- `categories`: Service categories
- `services`: Services offered by providers
- `orders`: Orders placed by users
- `reviews`: Reviews for services
- `messages`: Private messages between users
- `payments`: Payment records for orders

## Commands

- `npm run db:generate`: Generate migration files based on schema changes
- `npm run db:migrate`: Run migrations to update the database schema
- `npm run db:studio`: Launch Drizzle Studio to view and manage database

## Workflow

1. Make changes to the schema in `db/schema.ts`
2. Run `npm run db:generate` to create migration files
3. Run `npm run db:migrate` to apply changes to the database

## Relationships

- A user can be a service provider (one-to-one)
- A service provider can offer multiple services (one-to-many)
- A service belongs to a category (many-to-one)
- Users can place orders for services (many-to-many)
- Orders can receive reviews (one-to-many)
- Users can send/receive messages (many-to-many) 