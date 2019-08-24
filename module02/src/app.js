/**
 * In this file we will configure the Express server
 * in other words, it will create and initialize our app
 */
import express from 'express';
import routes from './routes';

import './database';

class App {
  constructor() {
    this.server = express();

    // it`s important to execute in order to
    // apply the middlewares and routers
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
