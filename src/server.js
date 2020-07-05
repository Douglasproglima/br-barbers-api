import app from './app';

require('dotenv').config();

const url = process.env.APP_URL;
const port = process.env.APP_PORT;
app.listen(port, () => {
  console.log(`Acesse: ${url}`);
  console.log(`O servidor está sendo executado na porta: ${port}`);
});
