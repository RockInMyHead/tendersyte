import { 
  users, tenders, tenderBids, marketplaceListings, messages, reviews,
  type User, type InsertUser,
  type Tender, type InsertTender,
  type TenderBid, type InsertTenderBid,
  type MarketplaceListing, type InsertMarketplaceListing,
  type Message, type InsertMessage,
  type Review, type InsertReview
} from "@shared/schema";
import { db } from "./db";
import { eq, and, like, gte, lte, or, desc, asc, sql } from "drizzle-orm";
import connectPg from "connect-pg-simple";
import session from "express-session";
import { pool } from "./db";
import { IStorage } from "./storage";

const PostgresSessionStore = connectPg(session);

export class DatabaseStorage implements IStorage {
  sessionStore: session.SessionStore;
  
  constructor() {
    this.sessionStore = new PostgresSessionStore({ 
      pool, 
      createTableIfMissing: true 
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async updateUser(id: number, userData: Partial<User>): Promise<User | undefined> {
    const [updatedUser] = await db
      .update(users)
      .set(userData)
      .where(eq(users.id, id))
      .returning();
    return updatedUser;
  }

  // Tender methods
  async getTenders(filters?: {
    category?: string;
    location?: string;
    status?: string;
    userId?: number;
    searchTerm?: string;
  }): Promise<Tender[]> {
    let query = db.select().from(tenders);
    
    if (filters) {
      let conditions = [];
      
      if (filters.category) {
        conditions.push(eq(tenders.category, filters.category));
      }
      
      if (filters.location) {
        conditions.push(like(tenders.location, `%${filters.location}%`));
      }
      
      if (filters.status) {
        conditions.push(eq(tenders.status, filters.status));
      }
      
      if (filters.userId) {
        conditions.push(eq(tenders.userId, filters.userId));
      }
      
      if (filters.searchTerm) {
        conditions.push(
          or(
            like(tenders.title, `%${filters.searchTerm}%`),
            like(tenders.description, `%${filters.searchTerm}%`)
          )
        );
      }
      
      if (conditions.length > 0) {
        query = query.where(and(...conditions));
      }
    }
    
    return await query.orderBy(desc(tenders.createdAt));
  }

  async getTender(id: number): Promise<Tender | undefined> {
    const [tender] = await db.select().from(tenders).where(eq(tenders.id, id));
    return tender;
  }

  async createTender(insertTender: InsertTender): Promise<Tender> {
    const [tender] = await db.insert(tenders).values(insertTender).returning();
    return tender;
  }

  async updateTender(id: number, tenderData: Partial<Tender>): Promise<Tender | undefined> {
    const [updatedTender] = await db
      .update(tenders)
      .set({ ...tenderData, updatedAt: new Date() })
      .where(eq(tenders.id, id))
      .returning();
    return updatedTender;
  }

  async deleteTender(id: number): Promise<boolean> {
    const result = await db.delete(tenders).where(eq(tenders.id, id));
    return result.count > 0;
  }

  async incrementTenderViews(id: number): Promise<void> {
    await db
      .update(tenders)
      .set({ 
        viewCount: sql`${tenders.viewCount} + 1` 
      })
      .where(eq(tenders.id, id));
  }

  // Tender bid methods
  async getTenderBids(tenderId: number): Promise<TenderBid[]> {
    return await db
      .select()
      .from(tenderBids)
      .where(eq(tenderBids.tenderId, tenderId))
      .orderBy(desc(tenderBids.createdAt));
  }

  async getTenderBid(id: number): Promise<TenderBid | undefined> {
    const [bid] = await db.select().from(tenderBids).where(eq(tenderBids.id, id));
    return bid;
  }

  async createTenderBid(insertBid: InsertTenderBid): Promise<TenderBid> {
    const [bid] = await db.insert(tenderBids).values(insertBid).returning();
    return bid;
  }

  async acceptTenderBid(bidId: number): Promise<TenderBid | undefined> {
    // First get the bid to get the tenderId
    const [bid] = await db.select().from(tenderBids).where(eq(tenderBids.id, bidId));
    if (!bid) return undefined;
    
    // Set all bids for this tender to not accepted
    await db
      .update(tenderBids)
      .set({ isAccepted: false })
      .where(eq(tenderBids.tenderId, bid.tenderId));
    
    // Accept this specific bid
    const [acceptedBid] = await db
      .update(tenderBids)
      .set({ isAccepted: true })
      .where(eq(tenderBids.id, bidId))
      .returning();
    
    // Update the tender status
    await db
      .update(tenders)
      .set({ status: 'in_progress', updatedAt: new Date() })
      .where(eq(tenders.id, bid.tenderId));
    
    return acceptedBid;
  }

  // Marketplace listing methods
  async getMarketplaceListings(filters?: {
    category?: string;
    subcategory?: string;
    listingType?: string;
    location?: string;
    userId?: number;
    minPrice?: number;
    maxPrice?: number;
    searchTerm?: string;
  }): Promise<MarketplaceListing[]> {
    let query = db.select().from(marketplaceListings).where(eq(marketplaceListings.isActive, true));
    
    if (filters) {
      let conditions = [eq(marketplaceListings.isActive, true)];
      
      if (filters.category) {
        conditions.push(eq(marketplaceListings.category, filters.category));
      }
      
      if (filters.subcategory) {
        conditions.push(eq(marketplaceListings.subcategory, filters.subcategory));
      }
      
      if (filters.listingType) {
        conditions.push(eq(marketplaceListings.listingType, filters.listingType));
      }
      
      if (filters.location) {
        conditions.push(like(marketplaceListings.location, `%${filters.location}%`));
      }
      
      if (filters.userId) {
        conditions.push(eq(marketplaceListings.userId, filters.userId));
      }
      
      if (filters.minPrice !== undefined) {
        conditions.push(gte(marketplaceListings.price, filters.minPrice));
      }
      
      if (filters.maxPrice !== undefined) {
        conditions.push(lte(marketplaceListings.price, filters.maxPrice));
      }
      
      if (filters.searchTerm) {
        conditions.push(
          or(
            like(marketplaceListings.title, `%${filters.searchTerm}%`),
            like(marketplaceListings.description, `%${filters.searchTerm}%`)
          )
        );
      }
      
      query = query.where(and(...conditions));
    }
    
    return await query.orderBy(desc(marketplaceListings.createdAt));
  }

  async getMarketplaceListing(id: number): Promise<MarketplaceListing | undefined> {
    const [listing] = await db
      .select()
      .from(marketplaceListings)
      .where(eq(marketplaceListings.id, id));
    return listing;
  }

  async createMarketplaceListing(insertListing: InsertMarketplaceListing): Promise<MarketplaceListing> {
    const [listing] = await db
      .insert(marketplaceListings)
      .values(insertListing)
      .returning();
    return listing;
  }

  async updateMarketplaceListing(
    id: number,
    listingData: Partial<MarketplaceListing>
  ): Promise<MarketplaceListing | undefined> {
    const [updatedListing] = await db
      .update(marketplaceListings)
      .set({ ...listingData, updatedAt: new Date() })
      .where(eq(marketplaceListings.id, id))
      .returning();
    return updatedListing;
  }

  async deleteMarketplaceListing(id: number): Promise<boolean> {
    // Soft delete - set isActive to false
    const result = await db
      .update(marketplaceListings)
      .set({ isActive: false, updatedAt: new Date() })
      .where(eq(marketplaceListings.id, id));
    return result.count > 0;
  }

  async incrementListingViews(id: number): Promise<void> {
    await db
      .update(marketplaceListings)
      .set({ 
        viewCount: sql`${marketplaceListings.viewCount} + 1` 
      })
      .where(eq(marketplaceListings.id, id));
  }

  // Message methods
  async getMessages(userId: number): Promise<Message[]> {
    return await db
      .select()
      .from(messages)
      .where(
        or(
          eq(messages.senderId, userId),
          eq(messages.receiverId, userId)
        )
      )
      .orderBy(asc(messages.createdAt));
  }

  async getConversation(user1Id: number, user2Id: number): Promise<Message[]> {
    return await db
      .select()
      .from(messages)
      .where(
        or(
          and(
            eq(messages.senderId, user1Id),
            eq(messages.receiverId, user2Id)
          ),
          and(
            eq(messages.senderId, user2Id),
            eq(messages.receiverId, user1Id)
          )
        )
      )
      .orderBy(asc(messages.createdAt));
  }

  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    // Готовим чистый объект для БД
    const safeMessage: any = {};
  
    // Список допустимых полей — корректируй по своей схеме!
    const allowedFields = [
      'senderId',
      'receiverId',
      'text',
      'attachments',
      'isRead',
      'createdAt'
    ];
  
    for (const key of allowedFields) {
      let val = (insertMessage as any)[key];
      if (typeof val === 'undefined') continue;
  
      if (key === 'attachments') {
        // Сериализуем attachments, если надо
        if (val && typeof val !== 'string') {
          val = JSON.stringify(val);
        }
        if (val === undefined) val = null;
        safeMessage.attachments = val;
        continue;
      }
  
      if (key === 'createdAt') {
        // Гарантируем строку ISO
        if (val instanceof Date) val = val.toISOString();
        if (typeof val === 'string' && !val.match(/^\d{4}-\d{2}-\d{2}/)) {
          val = new Date(val).toISOString();
        }
        if (!val) val = new Date().toISOString();
        safeMessage.createdAt = val;
        continue;
      }
  
      // Пропускаем объекты (вдруг вместо senderId случайно пришёл sender: {...})
      if (typeof val === 'object' && val !== null) {
        if (val.id && typeof val.id === 'number') {
          safeMessage[key] = val.id;
        }
        continue;
      }
  
      safeMessage[key] = val;
    }
  
    // Обязательные поля
    if (!safeMessage.createdAt) safeMessage.createdAt = new Date().toISOString();
    if (typeof safeMessage.isRead !== 'boolean') safeMessage.isRead = false;
  
    // Логируем payload для отладки
    console.log('insertMessage payload:', safeMessage);
  
    // Вставка в БД
    const [message] = await db
      .insert(messages)
      .values(safeMessage)
      .returning();
    return message;
  }
  
  

  async markMessageAsRead(id: number): Promise<Message | undefined> {
    const [updatedMessage] = await db
      .update(messages)
      .set({ isRead: true })
      .where(eq(messages.id, id))
      .returning();
    return updatedMessage;
  }

  // Review methods
  async getUserReviews(userId: number): Promise<Review[]> {
    return await db
      .select()
      .from(reviews)
      .where(eq(reviews.recipientId, userId))
      .orderBy(desc(reviews.createdAt));
  }

  async createReview(insertReview: InsertReview): Promise<Review> {
    const [review] = await db
      .insert(reviews)
      .values(insertReview)
      .returning();
    
    // Update the user's rating
    await this.updateUserRating(insertReview.recipientId);
    
    return review;
  }

  async updateUserRating(userId: number): Promise<number> {
    // Get all reviews for this user
    const userReviews = await this.getUserReviews(userId);
    if (userReviews.length === 0) return 0;
    
    // Calculate the average rating
    const totalRating = userReviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = Math.round(totalRating / userReviews.length);
    
    // Update the user's rating
    await db
      .update(users)
      .set({ rating: averageRating })
      .where(eq(users.id, userId));
    
    return averageRating;
  }
}