import { NotFoundError } from '@prisma/client/runtime';
import { NextFunction, Request, Response } from 'express';
import { IItemsService, ItemsService } from '../services/items.service';

export interface IItemsController {
  addItems(req: Request, res: Response, next: NextFunction): Promise<void>;
  fetchItems(req: Request, res: Response, next: NextFunction): Promise<void>;
}

export class ItemsController implements IItemsController {
  constructor(private itemsService: IItemsService = new ItemsService()) {}

  public addItems = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const auctioneerId = parseInt(req.params.userId);
    const auctionId = parseInt(req.params.auctionId);

    const { items } = req.body;
    try {
      await this.itemsService.addNewItems(items, auctionId);
    } catch (e) {
      throw new Error('Failed to add items');
    }
    const addedItems = await this.itemsService.getItems(auctionId);

    res.status(201).json(addedItems);
  };

  public fetchItems = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const auctionId = parseInt(req.params.auctionId);

    const auctionItems = await this.itemsService.getItems(auctionId);
    res.status(200).json(auctionItems);
  };
}
