import App from './app';
import { IndexRoute } from './api/routes/index.route';
import { AuthRoute } from './api/routes/auth.route';
import { UserRoute } from './api/routes/user.route';
import { CategoriesRoute } from './api/routes/categories.route ';
import { AuctionsRoute } from './api/routes/auctions.route';
import { ItemssRoute } from './api/routes/items.route';

(async () => {
  const app = new App([new IndexRoute(), new AuthRoute(), new UserRoute(), new CategoriesRoute(), new AuctionsRoute(), new ItemssRoute()]);
  await app.initializeApp();
  app.listen();
})();
