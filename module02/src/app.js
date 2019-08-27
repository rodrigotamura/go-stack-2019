/**
 * In this file we will configure the Express server
 * in other words, it will create and initialize our app
 */
import 'dotenv/config'; // loading .ENV

import express from 'express';
import path from 'path';
import Youch from 'youch';
import * as Sentry from '@sentry/node';
import sentryConfig from './config/sentry';
import 'express-async-errors'; // works with Sentry
import routes from './routes';

import './database';

class App {
  constructor() {
    this.server = express();

    // initializing Sentry for bug track managing
    Sentry.init(sentryConfig);

    // it`s important to execute in order to
    // apply the middlewares and routers
    this.middlewares();
    this.routes();
    this.exceptionHandler(); // handling errors for user interface
  }

  middlewares() {
    // Sentry
    this.server.use(Sentry.Handlers.requestHandler());

    this.server.use(express.json());
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    );
  }

  routes() {
    this.server.use(routes);
    this.server.use(Sentry.Handlers.errorHandler()); // Sentry
  }

  exceptionHandler() {
    // when we create a Middleware of error handling
    // we need to receive as the first param the error
    // Express will detect that, if some middleware is build with
    // 4 parameters, it will be considered a middleware of error handling
    this.server.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV === 'development') {
        const errors = await new Youch(err, req).toJSON();
        // you have an alternativo toHTML also
        // we prefer toJSON because in this case we are working over an API

        return res.status(500).json(errors);
      }

      return res.status(500).json({ error: 'Internal server error' });
    });
  }
}

export default new App().server;
