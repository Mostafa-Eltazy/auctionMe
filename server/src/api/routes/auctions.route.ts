import { Router } from 'express';
import { Route } from '../../common/interfaces/routes.interface';
import { AuctionsController, IAuctionsController } from '../../controllers/auctions.controller';
import { validate } from '../../middleware/request-validator.middleware';
import { createAuctionSchema } from '../../validations/auction.validation.schema';
import { auth } from '../../middleware/authenticate-token.middleware';


class AuctionsRoute implements Route {
  public path = '/auctions';
  public router = Router();

  constructor(private auctionsController: IAuctionsController = new AuctionsController()) {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/`, this.auctionsController.fetchAuctions);
    this.router.post(`/users/:userId/auctions`,auth,validate(createAuctionSchema),this.auctionsController.createAuction)
  }
}

export { AuctionsRoute };
