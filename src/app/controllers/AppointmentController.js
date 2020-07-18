import * as Yup from 'yup';
import { startOfHour, parseISO, isBefore, format, subHours } from 'date-fns';
import pt from 'date-fns/locale/pt';
import User from '../models/User';
import File from '../models/File';
import Appointment from '../models/Appointment';
import Notification from '../schemas/Notification';
// import Mail from '../../lib/Mail';
import CancellationMail from '../jobs/CancellationMail';
import Queue from '../../lib/Queue';

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

      /*       const isNotUserProvider = await User.findOne({
        where: {
          id: req.userId,
        },
      });
      if (isNotUserProvider)
        return res.status(401).json({
          message: 'Você não pode criar um agendamento para você mesmo.',
        }); */

      // Transforma dataString para obj Date do Js  e retorna apenas a hora
      const hourStart = startOfHour(parseISO(date));
      if (isBefore(hourStart, new Date()))
        return res.status(401).json({
          message: 'Não é permitido criar um agendamento no passado.',
        });

      // Valida se um agendamento está disponivel no mesmo horario para o agendamento atual
      const checkAvailability = await Appointment.findOne({
        where: {
          provider_id,
          canceled_at: null,
          date: hourStart,
        },
      });

      if (checkAvailability)
        return res
          .status(400)
          .json({ message: 'Este horário já está agendado.' });

      const appointment = await Appointment.create({
        user_id: req.userId,
        provider_id,
        date: hourStart,
      });

      /* Notificação ao Prestador de Serviço */
      const { name } = await User.findByPk(req.userId);
      const formateDate = format(
        hourStart,
        "'dia' dd 'de' MMMM', às' H:mm'h'",
        {
          locale: pt,
        }
      );
      await Notification.create({
        content: `Novo agendamento de '${name}' para o ${formateDate}`,
        user: provider_id,
      });

      return res.json(appointment);
    } catch (err) {
      return res.status(400).json({
        message: `Erro ao realizar agendamento: ${err}`,
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
      return res.status(401).json({
        Message: `Ocorreu um erro insperado ao consultar o registro. ${err}`,
        // errors: err.errors.map((erro) => erro.message),
      });
    }
  }

  async delete(req, res) {
    try {
      const appointment = await Appointment.findByPk(req.params.id, {
        include: [
          {
            model: User,
            as: 'provider',
            attributes: ['name', 'email'],
          },
          {
            model: User,
            as: 'users',
            attributes: ['id', 'name'],
          },
        ],
      });
      if (appointment.user_id !== req.userId) {
        return res.status(401).json({
          message: 'Você não tem permissão para cancelar este agendamento.',
        });
      }

      const dateWithSub = subHours(appointment.date, 2); // remove duas do agendamento
      console.log(dateWithSub);
      // Subtrai duas horas da data atual
      if (isBefore(dateWithSub, new Date())) {
        return res.status(401).json({
          message:
            'Você não pode realizar o cancelamento do agendamento pois falta menos de horas com relação a data agendada.',
        });
      }

      appointment.canceled_at = new Date();
      // await appointment.save();

      // Job para envio de email após o cancelamento
      await Queue.add(CancellationMail.key, {
        appointment,
      });
      // Envio de email após o cancelamento
      /*       await Mail.sendMail({
        to: `${appointment.provider.name} <${appointment.provider.email}>`,
        subject: 'Agendamento Cancelado',
        template: 'cancellation',
        context: {
          provider: appointment.provider.name,
          user: appointment.users.name,
          date: format(appointment.date, "'dia' dd 'de' MMMM', às' H:mm'h'", {
            locale: pt,
          }),
        },
      }); */
      return res.json(appointment);
    } catch (err) {
      return res.status(401).json({
        Message: `Ocorreu um erro insperado ao cancelar o agendamento. ${err}`,
        // errors: err.errors.map((erro) => erro.message),
      });
    }
  }
}

export default new AppointmentController();
