import { Router } from 'express';

const routes = new Router();

routes.get('/', (req, res) => {
  return res.json({ Message: 'Hello World - V1 API' });
});

export default routes;