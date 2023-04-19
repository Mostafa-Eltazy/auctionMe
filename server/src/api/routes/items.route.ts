import { Router } from 'express';
import { Route } from '../../common/interfaces/routes.interface';
import { ItemsController, IItemsController } from '../../controllers/items.controller';
import { validate } from '../../middleware/request-validator.middleware';
import { addItemsSchema } from '../../validations/item.validation.schema';
import { auth } from '../../middleware/authenticate-token.middleware';


class ItemssRoute implements Route {
  public path = '/items';
  public router = Router();

  constructor(private itemsController: IItemsController = new ItemsController()) {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/:auctionId`,this.itemsController.fetchItems);
    this.router.post(`${this.path}/:auctionId/:userId`,auth,validate(addItemsSchema),this.itemsController.addItems)
  }
}

export { ItemssRoute };
