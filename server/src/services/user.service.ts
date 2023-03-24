import { User } from '@prisma/client';
import { prisma } from '../database';

export interface IUserService {
  updateUser(userId: number, updatedData: Partial<User>): Promise<User>;
  getUser(userId: number): Promise<User | null>;
  getFeaturedUsers(): Promise<Partial<User>[]>;
  getUserStats(userId: number): Promise<{ username: string; profilePicture: string | null; }>;
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

  getUserStats = async (
    userId: number,
  ): Promise<{ username: string; profilePicture: string | null; }> => {
    const data = await prisma.user.findUniqueOrThrow({
      where: { id: userId },
      select: { username: true, profilePicture: true },
    });

    return {
      username: data.username,
      profilePicture: data.profilePicture,
    };
  };
}
