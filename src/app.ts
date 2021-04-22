import express, { Application } from 'express';
 
class App {
  public app: Application;
  public port: number;
 
  constructor(controllers: any, port: number) {
    this.app = express();
    this.port = port;
 
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
  }
 
  private initializeMiddlewares() {
    this.app.use(express.urlencoded({extended: true}));
    this.app.use(express.json())
  }
 
  private initializeControllers(controllers: any[]) {
    controllers.forEach((controller) => {
      this.app.use('/api', controller.router);
    });
  }
 
  public listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running at http://localhost:${this.port}/api`);
    });
  }
}
 
export default App;