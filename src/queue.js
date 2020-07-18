import Queue from './lib/Queue';

// Necessário para executar os Jobs/Fila em outra instância do Nodejs
// Rodar em outro terminal: node src/queue.js
// Obs: Configurar o sucrase
Queue.processQueue();
