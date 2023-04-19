import { Auction, User } from '@prisma/client';
import { prisma } from '../database';

export interface IAuctionsService {
  getAuctions(limit: number, page: number): Promise<{ auctions: Auction[]; count: number; limit: number }>;
  createNewAuction(auctionDate: Partial<Auction>): Promise<Partial<Auction>>;
}

export class AuctionsService implements IAuctionsService {
  public async getAuctions(limit: number, page: number): Promise<{ auctions: Auction[]; count: number; limit: number }> {
    const offset = limit * (page - 1);
    const [count, auctions] = await Promise.all([
      prisma.auction.count(),
      prisma.auction.findMany({
        take: limit,
        skip: offset,
        include:{_count:{select:{bids:true}}, auctioneer:{select:{username:true}}},
        orderBy: { updatedAt: 'desc' },
      }),
    ]);

    return { auctions: auctions, count, limit };
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
        auctioneerId,
      } as Auction,
    });
  }
}
