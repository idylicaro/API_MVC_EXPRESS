import App from './app';
import UserController from './controllers/user.controller';
import ProductController from './controllers/product.controller';
 
const app = new App(
  [
    new UserController(),
    new ProductController(),
  ],
  5050,
);
 
app.listen();