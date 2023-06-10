import { User, Auction } from '@prisma/client';
import { prisma } from '../database';

export interface IUserService {
  updateUser(userId: number, updatedData: Partial<User>): Promise<User>;
  getUser(userId: number): Promise<User | null>;
  getFeaturedUsers(): Promise<Partial<User>[]>;
  getUserStats(userId: number): Promise<{ username: string; profilePicture: string | null }>;
  getUserAuctions(userId: number, limit: number, page: number): Promise<{ userAuctions: Auction[]; count: number; limit: number }>;
}

export class UserService implements IUserService {
  public async updateUser(userId: number, updatedData: Partial<User>): Promise<User> {
    return prisma.user.update({ where: { id: userId }, data: { ...updatedData } });
  }

  public async getUser(userId: number): Promise<User | null> {
    return prisma.user.findUnique({ where: { id: userId } });
  }

  public async getFeaturedUsers(): Promise<Partial<User>[]> {
    return prisma.user.findMany({
      select: { id: true, username: true, email: true, profilePicture: true },
      take: 8,
    });
  }

  public getUserStats = async (userId: number): Promise<{ username: string; profilePicture: string | null }> => {
    const data = await prisma.user.findUniqueOrThrow({
      where: { id: userId },
      select: { username: true, profilePicture: true },
    });

    return {
      username: data.username,
      profilePicture: data.profilePicture,
    };
  };

  public getUserAuctions = async (userId: number, limit: number, page: number): Promise<{ userAuctions: Auction[]; count: number; limit: number }> => {
    const offset = limit * (page - 1);
    const [count, data] = await Promise.all([
      prisma.auction.count({ where: { auctioneerId: userId } }),
      prisma.auction.findMany({
        where: { auctioneerId: userId },
        take: limit,
        skip: offset,
        include: { _count: { select: { bids: true } }, auctioneer: { select: { username: true } } },
        orderBy: { updatedAt: 'desc' },
      }),
    ]);
    return { userAuctions: data, count, limit };
  };
}
