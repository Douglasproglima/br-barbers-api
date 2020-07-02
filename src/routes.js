import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/sessions', SessionController.store);
routes.post('/users', UserController.store);
routes.use(authMiddleware);

routes.put('/users/:id', UserController.update);
routes.delete('/users/:id', UserController.delete);
routes.get('/users', UserController.index);
routes.get('/users/:id', UserController.show);

export default routes;
