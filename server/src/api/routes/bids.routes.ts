import { Router } from 'express';
import { Route } from '../../common/interfaces/routes.interface';
import { BidsController, IBidsController } from '../../controllers/bids.controller';
import { validate } from '../../middleware/request-validator.middleware';
import { auth } from '../../middleware/authenticate-token.middleware';


class BidsRoute implements Route {
  public path = '/bids';
  public router = Router();

  constructor(private bidsController: IBidsController = new BidsController()) {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/:auctionId`, auth,this.bidsController.fetchBids);
  }
}

export { BidsRoute };
