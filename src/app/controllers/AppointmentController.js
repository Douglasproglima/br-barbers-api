import * as Yup from 'yup';
import User from '../models/User';
import File from '../models/File';
import Appointment from '../models/Appointment';

class AppointmentController {
  async store(req, res) {
    try {
      const schema = Yup.object().shape({
        provider_id: Yup.number().required(),
        date: Yup.date().required(),
      });

      if (!(await schema.isValid(req.body)))
        return res
          .status(400)
          .json({ message: 'Falha na validação dos campos' });

      const { provider_id, date } = req.body;
      // Valida se o usuário logado é um prestador de serviço
      const isProvider = await User.findOne({
        where: {
          id: provider_id,
          provider: true,
        },
      });
      if (!isProvider) {
        return res
          .status(401)
          .json({ message: 'Você não tem permissão de criar um agendamento' });
      }

      const appointment = await Appointment.create({
        user_id: req.userId,
        provider_id,
        date,
      });

      return res.json(appointment);
    } catch (err) {
      return res.status(400).json({
        errors: err,
        // errors: err.errors.map((erro) => erro.message),
      });
    }
  }

  async index(req, res) {
    try {
      const { page = 1 } = req.query;
      const appointments = await Appointment.findAll({
        where: { user_id: req.userId, canceled_at: null },
        attributes: ['id', 'date'],
        limit: 20,
        offset: (page - 1) * 20,
        include: [
          {
            model: User,
            as: 'provider',
            attributes: ['id', 'name'],
            order: [['id', 'DESC']],
            include: [
              {
                model: File,
                as: 'Avatar',
                attributes: ['id', 'path', 'url'],
                order: [['id', 'DESC']],
              },
            ],
          },
        ],
        order: [['id', 'DESC']],
      });
      return res.json(appointments);
    } catch (err) {
      return res.status(400).json({
        errors: err,
        // errors: err.errors.map((erro) => erro.message),
      });
    }
  }
}

export default new AppointmentController();