import User from '../models/User';
import Notification from '../schemas/Notification';

class NotificationController {
  async index(req, res) {
    // Valida se o usuário logado é um prestador de serviço
    const isProvider = await User.findOne({
      where: {
        id: req.userId,
        provider: true,
      },
    });

    if (!isProvider) {
      return res
        .status(401)
        .json({ message: 'Você não tem permissão de ver os agendamentos.' });
    }

    const notifications = await Notification.find({
      user: req.userId,
    })
      .sort({ createdAt: 'DESC' })
      .limit(20); // Vai buscar do mongo por isso o name column está assim

    return res.json(notifications);
  }

  async update(req, res) {
    // const notification = await Notification.findById(req.params.id);

    /* Mongoose oferece outros métodos */
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { read: true }, // atualiza a informação
      { new: true } // Retorna a nova informação
    );

    return res.json(notification);
  }
}

export default new NotificationController();
