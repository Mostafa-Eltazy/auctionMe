import { Auction, User, Item } from '@prisma/client';
import { prisma } from '../database';

export interface IItemsService {
  getItems(auctionId: number): Promise<Item[]>;
  addNewItems(items: { add: Item[] }, auctionId: number): Promise<void>;
}

export class ItemsService implements IItemsService {
  public async getItems(auctionId: number): Promise<Item[]> {
    const auctionItems = await prisma.item.findMany({where:{auctionId:auctionId}})

    return auctionItems;
  }

  public async addNewItems(items: { add: Item[] }, auctionId: number): Promise<void> {
    const { add } = items;
    await prisma.item.createMany({
      data: add.map(item => ({
        name: item.name,
        description: item.description,
        categoryId: item.categoryId,
        subCategoryId: item.subCategoryId,
        auctionId: auctionId,
      })),
    });
    
  
    
  }
}
