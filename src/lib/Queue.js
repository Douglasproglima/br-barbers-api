import Bee from 'bee-queue';
import CancellationMail from '../app/jobs/CancellationMail';
import redisConfig from '../config/redis';

// Add todos os jobs dentro do vetor abaixo e em seguida na várivel queues dentro do construtor
const jobs = [CancellationMail];

class Queue {
  constructor() {
    this.queues = {};

    this.init();
  }

  init() {
    // Bee é a instância que conecta o redis que consegue armazenar e recupara vlrs do BD
    // E também o handle que é responsável por processar as filas, que recebe as váriaveis do contexto
    // do e-mail ou qualquer contéudo de um Job.
    jobs.forEach(({ key, handle }) => {
      this.queues[key] = {
        bee: new Bee(key, {
          redis: redisConfig,
        }),
        handle,
      };
    });
  }

  // Add novas rotinas dentro da fila
  add(queue, job) {
    // Toda vez que chamar esse método e passar o CancellationMail e os dados do appointment como segundo parâmetro
    return this.queues[queue].bee.createJob(job).save();
  }

  // Processando as Filas, pega cada job e processa em tempo real.
  // Todo novo job dentro do redis o job será processado através desse método em background.
  processQueue() {
    jobs.forEach((job) => {
      // Busca o bee e handle(Método init()) da fila relacionada ao determinado job
      const { bee, handle } = this.queues[job.key];

      bee.on('failed', this.handleFailure).process(handle);
    });
  }

  handleFailure(job, err) {
    console.log(job, err);
  }
}

export default new Queue();
