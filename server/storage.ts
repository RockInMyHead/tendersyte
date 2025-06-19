import {
  type User, type InsertUser,
  type Tender, type InsertTender,
  type TenderBid, type InsertTenderBid,
  type MarketplaceListing, type InsertMarketplaceListing,
  type Message, type InsertMessage,
  type Review, type InsertReview
} from "@shared/schema";

// Минимальный интерфейс для хранения данных
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, userData: Partial<User>): Promise<User | undefined>;
  getTopSpecialists(personType: string): Promise<User[]>;

  // Tender methods
  getTenders(filters?: {
    category?: string;
    location?: string;
    status?: string;
    userId?: number;
    searchTerm?: string;
  }): Promise<Tender[]>;
  getTender(id: number): Promise<Tender | undefined>;
  createTender(tender: InsertTender): Promise<Tender>;
  updateTender(id: number, tenderData: Partial<Tender>): Promise<Tender | undefined>;
  deleteTender(id: number): Promise<boolean>;
  incrementTenderViews(id: number): Promise<void>;

  // Tender bid methods
  getTenderBids(tenderId: number): Promise<TenderBid[]>;
  getTenderBid(id: number): Promise<TenderBid | undefined>;
  createTenderBid(bid: InsertTenderBid): Promise<TenderBid>;
  acceptTenderBid(bidId: number): Promise<TenderBid | undefined>;

  // Marketplace methods
  getMarketplaceListings(filters?: {
    category?: string;
    subcategory?: string;
    listingType?: string;
    location?: string;
    userId?: number;
    minPrice?: number;
    maxPrice?: number;
    searchTerm?: string;
  }): Promise<MarketplaceListing[]>;
  getMarketplaceListing(id: number): Promise<MarketplaceListing | undefined>;
  createMarketplaceListing(listing: InsertMarketplaceListing): Promise<MarketplaceListing>;
  updateMarketplaceListing(id: number, listingData: Partial<MarketplaceListing>): Promise<MarketplaceListing | undefined>;
  deleteMarketplaceListing(id: number): Promise<boolean>;
  incrementListingViews(id: number): Promise<void>;

  // Message methods
  getMessages(userId: number): Promise<Message[]>;
  getConversation(user1Id: number, user2Id: number): Promise<Message[]>;
  createMessage(message: InsertMessage): Promise<Message>;
  markMessageAsRead(id: number): Promise<Message | undefined>;

  // Review methods
  getUserReviews(userId: number): Promise<Review[]>;
  createReview(review: InsertReview): Promise<Review>;
  updateUserRating(userId: number): Promise<number>;
}

// Импортируем реализацию базы данных
import { DatabaseStorage } from "./database-storage";

// Используем базу данных для хранения
export const storage = new DatabaseStorage();
