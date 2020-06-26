const { Router } = require('express');
const routes = new Router();

routes.get('/', (req, res) => {
  return res.json({ Message: 'Hello World - V1 API' });
});

module.exports = routes;