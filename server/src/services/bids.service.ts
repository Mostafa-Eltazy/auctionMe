import { Bid, User } from '@prisma/client';
import { prisma } from '../database';

export interface IBidsService {
  getBids(auctionId: number): Promise<{ bids: Bid[]; count: number;}>;
}

export class BidsService implements IBidsService {
  public async getBids(auctionId:number): Promise<{ bids: Bid[], count: number; }> {
    const [count, bids] = await Promise.all([
      prisma.bid.count({where:{auctionId:auctionId}}),
      prisma.bid.findMany({
        where:{auctionId:auctionId},
        include:{bider:{select:{username:true}}},
        orderBy: { value : 'desc' },
      }),
    ]);

    return { bids: bids, count };
  }

  
}
