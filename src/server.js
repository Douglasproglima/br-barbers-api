import app from './app';

const port = 3000;
app.listen(port, () => {
  console.log(`Acesse: http://localhost:${port}`);
  console.log(`O servidor está sendo executado na porta: ${port}`);
});