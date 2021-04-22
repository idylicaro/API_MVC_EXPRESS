import App from './app';
import UserController from './controllers/user.controller';
 
const app = new App(
  [
    new UserController(),
  ],
  5050,
);
 
app.listen();