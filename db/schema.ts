import { pgTable,  text, timestamp, uuid, integer, boolean, pgEnum, json,  varchar, numeric, date } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Enums
export const userRoleEnum = pgEnum('user_role', ['user', 'admin', 'service_provider']);
export const orderStatusEnum = pgEnum('order_status', ['pending', 'in_progress', 'completed', 'canceled', 'revision']);
export const serviceStatusEnum = pgEnum('service_status', ['draft', 'active', 'inactive', 'rejected']);
export const serviceRequestStatusEnum = pgEnum('service_request_status', ['open', 'in_progress', 'fulfilled', 'canceled']);
export const verificationTypeEnum = pgEnum('verification_type', ['email', 'password_reset']);

// Users table
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  name: text('name').notNull(),
  role: userRoleEnum('role').default('user').notNull(),
  avatar: text('avatar'),
  bio: text('bio'),
  emailVerified: boolean('email_verified').default(false).notNull(),
  twoFactorEnabled: boolean('two_factor_enabled').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Session table
export const sessions = pgTable('sessions', {
  id: text('id').primaryKey(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  expiresAt: timestamp('expires_at', {
    withTimezone: true,
    mode: 'date'
  }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  userAgent: text('user_agent'),
  ipAddress: text('ip_address'),
  data: json('data'),
});

// Email Verification table
export const emailVerifications = pgTable('email_verifications', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  token: text('token').notNull(),
  type: verificationTypeEnum('type').default('email').notNull(),
  expires: timestamp('expires').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Two Factor Authentication table
export const twoFactorAuth = pgTable('two_factor_auth', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  token: text('token').notNull(),
  valid: boolean('valid').default(true).notNull(),
  expires: timestamp('expires').notNull(),
  ip: text('ip'),
  userAgent: text('user_agent'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Service Providers table
export const serviceProviders = pgTable('service_providers', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id).notNull().unique(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  skills: json('skills').default([]),
  languages: json('languages').default([]),
  education: json('education').default([]),
  certifications: json('certifications').default([]),
  location: text('location'),
  averageRating: numeric('average_rating').default('0'),
  totalReviews: integer('total_reviews').default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Service Seekers table
export const serviceSeekers = pgTable('service_seekers', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id).notNull().unique(),
  preferences: json('preferences').default({}),
  location: text('location'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Categories table
export const categories = pgTable('categories', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull().unique(),
  slug: text('slug').notNull().unique(),
  description: text('description'),
  icon: text('icon'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Services table
export const services = pgTable('services', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  providerId: uuid('provider_id').references(() => serviceProviders.id).notNull(),
  categoryId: uuid('category_id').references(() => categories.id).notNull(),
  price: numeric('price').notNull(),
  images: json('images').default([]),
  features: json('features').default([]),
  deliveryTime: integer('delivery_time').notNull(), // in days
  revisions: integer('revisions').default(1),
  status: serviceStatusEnum('status').default('draft').notNull(),
  averageRating: numeric('average_rating').default('0'),
  totalReviews: integer('total_reviews').default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Orders table
export const orders = pgTable('orders', {
  id: uuid('id').primaryKey().defaultRandom(),
  buyerId: uuid('buyer_id').references(() => users.id).notNull(),
  serviceId: uuid('service_id').references(() => services.id).notNull(),
  status: orderStatusEnum('status').default('pending').notNull(),
  requirements: text('requirements'),
  deliveryDate: date('delivery_date').notNull(),
  price: numeric('price').notNull(),
  quantity: integer('quantity').default(1).notNull(),
  totalAmount: numeric('total_amount').notNull(),
  completedAt: timestamp('completed_at'),
  cancelReason: text('cancel_reason'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Reviews table
export const reviews = pgTable('reviews', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  serviceId: uuid('service_id').references(() => services.id).notNull(),
  rating: integer('rating').notNull(),
  comment: text('comment'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Messages table
export const messages = pgTable('messages', {
  id: uuid('id').primaryKey().defaultRandom(),
  senderId: uuid('sender_id').references(() => users.id).notNull(),
  receiverId: uuid('receiver_id').references(() => users.id).notNull(),
  content: text('content').notNull(),
  read: boolean('read').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Payments table
export const payments = pgTable('payments', {
  id: uuid('id').primaryKey().defaultRandom(),
  orderId: uuid('order_id').references(() => orders.id).notNull(),
  amount: numeric('amount').notNull(),
  status: varchar('status', { length: 50 }).notNull(),
  paymentMethod: varchar('payment_method', { length: 50 }).notNull(),
  paymentIntent: varchar('payment_intent', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Service Requests table
export const serviceRequests = pgTable('service_requests', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  seekerId: uuid('seeker_id').references(() => serviceSeekers.id).notNull(),
  categoryId: uuid('category_id').references(() => categories.id).notNull(),
  budget: numeric('budget'),
  attachments: json('attachments').default([]),
  requirements: text('requirements'),
  deadline: date('deadline'),
  status: serviceRequestStatusEnum('status').default('open').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Service Request Proposals table
export const serviceRequestProposals = pgTable('service_request_proposals', {
  id: uuid('id').primaryKey().defaultRandom(),
  requestId: uuid('request_id').references(() => serviceRequests.id).notNull(),
  providerId: uuid('provider_id').references(() => serviceProviders.id).notNull(),
  message: text('message').notNull(),
  price: numeric('price').notNull(),
  deliveryTime: integer('delivery_time').notNull(), // in days
  status: varchar('status', { length: 50 }).default('pending').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Relations
export const usersRelations = relations(users, ({ one, many }) => ({
  serviceProvider: one(serviceProviders, {
    fields: [users.id],
    references: [serviceProviders.userId],
  }),
  serviceSeeker: one(serviceSeekers, {
    fields: [users.id],
    references: [serviceSeekers.userId],
  }),
  emailVerifications: many(emailVerifications),
  twoFactorAuth: many(twoFactorAuth),
  sessions: many(sessions),
  reviews: many(reviews),
  orders: many(orders, { relationName: 'buyer' }),
}));

export const serviceProvidersRelations = relations(serviceProviders, ({ one, many }) => ({
  user: one(users, {
    fields: [serviceProviders.userId],
    references: [users.id],
  }),
  services: many(services),
}));

export const serviceSeekersRelations = relations(serviceSeekers, ({ one, many }) => ({
  user: one(users, {
    fields: [serviceSeekers.userId],
    references: [users.id],
  }),
  serviceRequests: many(serviceRequests),
}));

export const categoriesRelations = relations(categories, ({ many }) => ({
  services: many(services),
  serviceRequests: many(serviceRequests),
}));

export const servicesRelations = relations(services, ({ one, many }) => ({
  provider: one(serviceProviders, {
    fields: [services.providerId],
    references: [serviceProviders.id],
  }),
  category: one(categories, {
    fields: [services.categoryId],
    references: [categories.id],
  }),
  reviews: many(reviews),
  orders: many(orders),
}));

export const ordersRelations = relations(orders, ({ one }) => ({
  buyer: one(users, {
    fields: [orders.buyerId],
    references: [users.id],
    relationName: 'buyer',
  }),
  service: one(services, {
    fields: [orders.serviceId],
    references: [services.id],
  }),
}));

export const reviewsRelations = relations(reviews, ({ one }) => ({
  user: one(users, {
    fields: [reviews.userId],
    references: [users.id],
  }),
  service: one(services, {
    fields: [reviews.serviceId],
    references: [services.id],
  }),
}));

export const messagesRelations = relations(messages, ({ one }) => ({
  sender: one(users, {
    fields: [messages.senderId],
    references: [users.id],
  }),
  receiver: one(users, {
    fields: [messages.receiverId],
    references: [users.id],
  }),
}));

export const paymentsRelations = relations(payments, ({ one }) => ({
  order: one(orders, {
    fields: [payments.orderId],
    references: [orders.id],
  }),
}));

export const serviceRequestsRelations = relations(serviceRequests, ({ one, many }) => ({
  seeker: one(serviceSeekers, {
    fields: [serviceRequests.seekerId],
    references: [serviceSeekers.id],
  }),
  category: one(categories, {
    fields: [serviceRequests.categoryId],
    references: [categories.id],
  }),
  proposals: many(serviceRequestProposals),
}));

export const serviceRequestProposalsRelations = relations(serviceRequestProposals, ({ one }) => ({
  request: one(serviceRequests, {
    fields: [serviceRequestProposals.requestId],
    references: [serviceRequests.id],
  }),
  provider: one(serviceProviders, {
    fields: [serviceRequestProposals.providerId],
    references: [serviceProviders.id],
  }),
}));

export const emailVerificationsRelations = relations(emailVerifications, ({ one }) => ({
  user: one(users, {
    fields: [emailVerifications.userId],
    references: [users.id],
  }),
}));

export const twoFactorAuthRelations = relations(twoFactorAuth, ({ one }) => ({
  user: one(users, {
    fields: [twoFactorAuth.userId],
    references: [users.id],
  }),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));
