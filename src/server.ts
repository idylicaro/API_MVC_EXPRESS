import App from './app';
import UserController from './controllers/user.controller';
import ProductController from './controllers/product.controller';
import SaleController from './controllers/sale.controller';
 
const app = new App(
  [
    new UserController(),
    new ProductController(),
    new SaleController(),
  ],
  5050,
);
 
app.listen();