import {
  startOfDay,
  endOfDay,
  setHours,
  setMinutes,
  setSeconds,
  format,
  isAfter,
} from 'date-fns';
import { Op } from 'sequelize';
import Appointment from '../models/Appointment';

class AvaliblesController {
  async index(req, res) {
    const { date } = req.query;
    if (!date) return res.status(400).json({ message: 'Data inválida.' });

    // Tradução: 2020-07-18 17:30:33
    const searchDate = Number(date); // ou parseInt(date);
    const appointments = await Appointment.findAll({
      where: {
        provider_id: req.params.providerId,
        canceled_at: null,
        date: {
          [Op.between]: [startOfDay(searchDate), endOfDay(searchDate)],
        },
      },
    });

    // O ideal é criar uma tabela para que o prestador de serviço selecione o horário que irá trabalhar
    // Todos os horários de serviços.
    const schedule = [
      '08:00', // Converter -> 2020-07-18 08:00
      '09:00', // Converter -> 2020-07-18 09:00
      '10:00',
      '11:00',
      '12:00',
      '13:00',
      '14:00',
      '15:00',
      '16:00',
      '17:00',
      '18:00',
      '19:00',
      '20:00',
      '21:00',
      '22:00',
      '23:00',
    ];

    // Retorna as datas disponíveis para o usuário
    const avaiable = schedule.map((time) => {
      // validar se os horários do schedule se não passou do horário atual e se não estiver ocupado por algum agendamento

      const [hour, minute] = time.split(':');
      const value = setSeconds(
        setMinutes(setHours(searchDate, hour), minute),
        0
      );

      return {
        time,
        // Formato: 2020-07-18T08:00:00+03:00
        value: format(value, "yyyy-MM-dd'T'HH:mm:ssxxx"),
        // Verifica se o value é depois do horário atual
        avaiable:
          isAfter(value, new Date()) &&
          // Verifica se o horário não está marcado
          !appointments.find((a) => format(a.date, 'HH:mm') === time),
      };
    });

    return res.json(avaiable);
  }
}

export default new AvaliblesController();
