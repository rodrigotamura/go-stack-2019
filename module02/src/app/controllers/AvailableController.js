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

class AvailableController {
  async index(req, res) {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ error: 'Invalid date' });
    }

    const searchDate = Number(date); // transforming into integer

    // filtering appointments in seachDate
    const appointments = await Appointment.findAll({
      where: {
        provider_id: req.params.providerId,
        canceled_at: null, // only available schedules
        // startOfDay / endOfDay receive date and numeric formats
        date: { [Op.between]: [startOfDay(searchDate), endOfDay(searchDate)] },
      },
    });

    // all time available a provider has
    const schedule = [
      '08:00',
      '09:00',
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
    ];

    // available will have an object with all available time
    const available = schedule.map(time => {
      // let's round the time given by DB
      const [hour, minute] = time.split(':');
      const value = setSeconds(
        setMinutes(setHours(searchDate, hour), minute),
        0
      ); // converting 2019-06-23 08:33:54 -> 2019-06-23 08:00:00

      return {
        time,
        value: format(value, "yyyy-MM-dd'T'HH:mm:ssxxx"),
        // checking if the time is passed of current time
        available:
          isAfter(value, new Date()) &&
          // checking if time is not scheduled already
          !appointments.find(a => {
            return (
              format(setSeconds(setMinutes(a.date, 0), 0), 'HH:mm') === time
            );
          }),
      };

      // verify if time is an old time
    });

    return res.json(available);
  }
}

export default new AvailableController();
