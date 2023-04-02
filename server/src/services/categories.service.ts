import { Auction, Category, User } from '@prisma/client';
import { prisma } from '../database';

export interface ICategoriesService {
  getCategories(): Promise<Partial<Category>[]>;
}

export class CategoriesService implements ICategoriesService {

  public async getCategories(): Promise<Partial<Category>[]> {
    return prisma.category.findMany({
      select: { id: true, name:true, slug:true,description:true,createdAt:true,updatedAt:true, subCategories:true },
    });
  }

  
}
