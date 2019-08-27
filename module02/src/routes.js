import { Router } from 'express';

import multer from 'multer'; // upload files
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import authMiddleware from './app/middlewares/auth';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';
import AppointmentController from './app/controllers/AppointmentController';
import ScheduleController from './app/controllers/ScheduleController';
import NotificationController from './app/controllers/NotificationController';

const routes = new Router();
const upload = multer(multerConfig);

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

// uploading files
// 'file' will be the name of file field
routes.post('/files', upload.single('file'), FileController.store);
routes.get('/providers', ProviderController.index);

routes.get('/appointments', AppointmentController.index);
routes.post('/appointments', AppointmentController.store);
routes.delete('/appointments/:id', AppointmentController.delete);

routes.get('/schedules', ScheduleController.index);

routes.get('/notifications', NotificationController.index);
routes.put('/notifications/:id', NotificationController.update);

export default routes;
