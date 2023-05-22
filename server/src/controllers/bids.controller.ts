import { NotFoundError } from '@prisma/client/runtime';
import { NextFunction, Request, Response } from 'express';
import { IBidsService, BidsService } from '../services/bids.service';

export interface IBidsController {
  fetchBids(req: Request, res: Response, next: NextFunction): Promise<void>;
}

export class BidsController implements IBidsController {
  constructor(private bidsService: IBidsService = new BidsService()) {}

  public fetchBids = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const limit = parseInt(req.query.limit as unknown as string);
    const page = parseInt(req.query.page as unknown as string);
    const auctionId = parseInt(req.params.auctionId as unknown as string);
    const bidsData = await this.bidsService.getBids(auctionId, limit, page);
    res.status(200).json(bidsData);
  };
}
