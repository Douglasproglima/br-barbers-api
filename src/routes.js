import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multerConfig';
import UserController from './app/controllers/UserController';
import PermissionController from './app/controllers/PermissionController';
import SessionController from './app/controllers/SessionController';
import authMiddleware from './app/middlewares/auth';
import FileController from './app/controllers/FileController';

const routes = new Router();
const upload = multer(multerConfig);

/* Sessão e Usuário */
routes.post('/sessions', SessionController.store);
routes.post('/users', UserController.store);
routes.use(authMiddleware);

/* Roles, Permissão */
routes.get('/permissions', PermissionController.index);
routes.get('/permissions/:id', PermissionController.show);

/* Usuário e Avatar */
routes.put('/users/', UserController.update);
routes.delete('/users/', UserController.delete);
routes.get('/users', UserController.index);
routes.get('/users/:id', UserController.show);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
