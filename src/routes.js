import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multerConfig';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/sessions', SessionController.store);
routes.post('/users', UserController.store);
routes.use(authMiddleware);

routes.put('/users/', UserController.update);
routes.delete('/users/', UserController.delete);
routes.get('/users', UserController.index);
routes.get('/users/:id', UserController.show);

routes.post('/files', upload.single('file'), (req, res) => {
  return res.json({ message: true });
});

export default routes;
