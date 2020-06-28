import { Router } from 'express';

const routes = new Router();
const users = ['Douglas', 'Fernando', 'Augusto'];

routes.get('/', (req, res) => {
  return res.json(users);
});

routes.get('/users/:id', (req, res) => {
  return res.json(users[req.params.id]);
});

routes.post('/users/', (req, res) => {
  const name = req.body;
  users.push(name);
  return res.json(users);
});

export default routes;