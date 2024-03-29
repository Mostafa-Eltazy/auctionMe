import { NotFoundError } from '@prisma/client/runtime';
import { NextFunction, Request, Response } from 'express';
import { IAuctionsService, AuctionsService } from '../services/auctions.service';

export interface IAuctionsController {
  createAuction(req: Request, res: Response, next: NextFunction): Promise<void>;
  fetchAuctions(req: Request, res: Response, next: NextFunction): Promise<void>;
}

export class AuctionsController implements IAuctionsController {
  constructor(private auctionsService: IAuctionsService = new AuctionsService()) {}

  public createAuction = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const auctioneerId = parseInt(req.params.userId)
    
    const { title, startDate, endDate, type, startingBid } = req.body;
    const newAuciton = await this.auctionsService.createNewAuction({
      title,
      startDate,
      endDate,
      type,
      startingBid,
      auctioneerId,
    });
    res.status(201).json(newAuciton);
  };

  public fetchAuctions = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const limit = parseInt(req.query.limit as unknown as string);
    const page = parseInt(req.query.page as unknown as string);

    const auctionsData = await this.auctionsService.getAuctions(limit, page);
    res.status(200).json(auctionsData);
  };
}
