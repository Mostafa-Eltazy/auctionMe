import { Auction, User } from '@prisma/client';
import { prisma } from '../database';

export interface IAuctionsService {
  getAuctions(): Promise<Partial<Auction>[]>;
  createNewAuction(auctionDate: Partial<Auction>): Promise<Partial<Auction>>;
}

export class AuctionsService implements IAuctionsService {
  public async getAuctions(): Promise<Partial<Auction>[]> {
    return prisma.auction.findMany();
  }

  public async createNewAuction(auctionDate: Partial<Auction>): Promise<Partial<Auction>> {
    const { title, startDate, endDate, type, startingBid, auctioneerId } = auctionDate;

    return prisma.auction.create({
      data: {
        title,
        startDate,
        endDate,
        type,
        startingBid,
        auctioneerId
      } as Auction,
    });
  }
}
