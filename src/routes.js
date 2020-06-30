import { Router } from 'express';
import UserController from './app/controllers/UserController';

const routes = new Router();

routes.post('/users', UserController.store);
routes.put('/users/:id', UserController.update);
routes.delete('/users/:id', UserController.delete);
routes.get('/users', UserController.index);
routes.get('/users/:id', UserController.show);

export default routes;
