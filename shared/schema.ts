import { pgTable, text, serial, integer, boolean, json, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Enum definitions
export const userTypeEnum = pgEnum('user_type', ['individual', 'contractor', 'company']);
export const tenderStatusEnum = pgEnum('tender_status', ['open', 'in_progress', 'completed', 'canceled']);
export const listingTypeEnum = pgEnum('listing_type', ['sell', 'rent', 'buy']);
export const categoryEnum = pgEnum('category', ['equipment', 'materials', 'tools', 'services']);
export const subcategoryEnum = pgEnum('subcategory', [
  'excavators', 'loaders', 'cranes', 'trucks', 'concrete_mixers',
  'bricks', 'cement', 'wood', 'metal', 'paint',
  'power_tools', 'hand_tools', 'measuring_tools', 'ladders', 'scaffolding',
  'repair', 'construction', 'design', 'demolition', 'cleaning'
]);

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone"),
  fullName: text("full_name").notNull(),
  userType: userTypeEnum("user_type").notNull().default('individual'),
  location: text("location"),
  bio: text("bio"),
  avatar: text("avatar"),
  rating: integer("rating").default(0),
  isVerified: boolean("is_verified").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// Tenders table
export const tenders = pgTable("tenders", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: categoryEnum("category").notNull(),
  subcategory: subcategoryEnum("subcategory"),
  budget: integer("budget"),
  location: text("location").notNull(),
  deadline: timestamp("deadline").notNull(),
  status: tenderStatusEnum("status").notNull().default('open'),
  userId: integer("user_id").notNull().references(() => users.id),
  images: json("images").$type<string[]>().default([]),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  viewCount: integer("view_count").default(0),
});

// Tender bids table
export const tenderBids = pgTable("tender_bids", {
  id: serial("id").primaryKey(),
  tenderId: integer("tender_id").notNull().references(() => tenders.id),
  userId: integer("user_id").notNull().references(() => users.id),
  amount: integer("amount").notNull(),
  description: text("description").notNull(),
  timeframe: integer("timeframe"), // in days
  isAccepted: boolean("is_accepted").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// Marketplace listings table
export const marketplaceListings = pgTable("marketplace_listings", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(),
  listingType: listingTypeEnum("listing_type").notNull(),
  category: categoryEnum("category").notNull(),
  subcategory: subcategoryEnum("subcategory"),
  condition: text("condition"),
  location: text("location").notNull(),
  userId: integer("user_id").notNull().references(() => users.id),
  images: json("images").$type<string[]>().default([]),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  viewCount: integer("view_count").default(0),
});

// Messages table
export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  senderId: integer("sender_id").notNull().references(() => users.id),
  receiverId: integer("receiver_id").notNull().references(() => users.id),
  content: text("content").notNull(),
  isRead: boolean("is_read").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// Reviews table
export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  reviewerId: integer("reviewer_id").notNull().references(() => users.id),
  recipientId: integer("recipient_id").notNull().references(() => users.id),
  tenderId: integer("tender_id").references(() => tenders.id),
  listingId: integer("listing_id").references(() => marketplaceListings.id),
  rating: integer("rating").notNull(),
  comment: text("comment"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true, 
  rating: true, 
  isVerified: true, 
  createdAt: true
});

export const insertTenderSchema = createInsertSchema(tenders).omit({
  id: true, 
  status: true, 
  createdAt: true, 
  updatedAt: true, 
  viewCount: true
});

export const insertTenderBidSchema = createInsertSchema(tenderBids).omit({
  id: true, 
  isAccepted: true, 
  createdAt: true
});

export const insertMarketplaceListingSchema = createInsertSchema(marketplaceListings).omit({
  id: true, 
  isActive: true, 
  createdAt: true, 
  updatedAt: true, 
  viewCount: true
});

export const insertMessageSchema = createInsertSchema(messages).omit({
  id: true, 
  isRead: true, 
  createdAt: true
});

export const insertReviewSchema = createInsertSchema(reviews).omit({
  id: true, 
  createdAt: true
});

// Export types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Tender = typeof tenders.$inferSelect;
export type InsertTender = z.infer<typeof insertTenderSchema>;

export type TenderBid = typeof tenderBids.$inferSelect;
export type InsertTenderBid = z.infer<typeof insertTenderBidSchema>;

export type MarketplaceListing = typeof marketplaceListings.$inferSelect;
export type InsertMarketplaceListing = z.infer<typeof insertMarketplaceListingSchema>;

export type Message = typeof messages.$inferSelect;
export type InsertMessage = z.infer<typeof insertMessageSchema>;

export type Review = typeof reviews.$inferSelect;
export type InsertReview = z.infer<typeof insertReviewSchema>;
