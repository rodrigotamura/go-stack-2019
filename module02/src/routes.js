import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

/*
// import User from './app/models/User'; // importing for DB testing
// testing the connection with DB
routes.get('/', async (req, res) => {
  const user = await User.create({
    name: 'Rodrigo Tamura',
    email: 'rodrigotamura@hotmail.com',
    password_hash: '123456789',
  });

  return res.json(user);
});
*/

routes.post('/users', UserController.store);

routes.post('/sessions', SessionController.store);

// PROTECTED ROUTES
// we can use middleware in two ways:
// locally, implementing reoutes.put('/users', authMiddleware, UserController.update);
// or globally, adding routes.use(authMiddleware); and each route declared
// bellow it will be protected
routes.use(authMiddleware);
routes.put('/users', UserController.update);

export default routes;
