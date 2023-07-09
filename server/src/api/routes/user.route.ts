import { Router } from 'express';
import { Route } from '../../common/interfaces/routes.interface';
import { IUserController, UserController } from '../../controllers/user.controller';
import { auth } from '../../middleware/authenticate-token.middleware';
import { upload } from '../../middleware/upload-file.middleware';

class UserRoute implements Route {
  public path = '/users';
  public router = Router();

  constructor(private userController: IUserController = new UserController()) {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.put(`${this.path}/profile-picture`, auth, upload.single('profilePicture'), this.userController.uploadPicture);
    this.router.get('/user', auth, this.userController.fetchUser);
    this.router.get(`/user/:userId/stats`, auth, this.userController.fetchUserStats);
    this.router.get(`${this.path}/featured`, auth, this.userController.fetchFeatuedUsers);
    this.router.get(`/user/auctions`, auth, this.userController.fetchUserAuctions);
    this.router.get(`/user/bids`, auth, this.userController.fetchUserBids);

  }
}

export { UserRoute };
