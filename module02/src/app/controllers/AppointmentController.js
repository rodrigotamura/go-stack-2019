import * as Yup from 'yup';
import {
  startOfHour,
  endOfHour,
  parseISO,
  isBefore,
  format,
  subHours,
} from 'date-fns'; // let's only import this feature
import { Sequelize } from 'sequelize';
import Appointment from '../models/Appointment';
import User from '../models/User';
import File from '../models/File';
import Notification from '../schemas/Notification';

import Mail from '../../lib/Mail';

/**
 * User will manage his appointments with the provider
 * Repeating: THIS IS FOR USER, NOT PROVIDER
 * (for providers we have ScheduleController)
 */

class AppointmentController {
  async index(req, res) {
    // paging (ater see 'offset' bellow)
    const { page = 1 } = req.query;

    const appointments = await Appointment.findAll({
      where: {
        user_id: req.userId,
        canceled_at: null,
      },
      order: ['date'], // order by date
      attributes: ['id', 'date'],

      // pagination
      limit: 20,
      offset: (page - 1) * 20,

      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['id', 'name'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['path', 'url'],
            }, // including relationship with File
          ],
        },
      ], // relationship
    });

    return res.json(appointments);
  }

  async store(req, res) {
    const { Op } = Sequelize;

    const schema = Yup.object().shape({
      date: Yup.date().required(),
      provider_id: Yup.number()
        .required()
        .notOneOf([req.userId]),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { provider_id, date } = req.body;

    // checking if provider_id is a provider

    const isProvider = await User.findOne({
      where: { id: provider_id, provider: true },
    });
    if (!isProvider) {
      return res
        .status(400)
        .json({ error: 'You can only create appointments with providers' });
    }

    // user cannot make an appointment with himself
    /* if (provider_id === req.userId) {
      return res
        .status(400)
        .json({ error: 'You cannot make an appointmente with yourself' });
    } */

    // Let`s create now a valitation that will not permit if
    // some another appointment exists in a period of same time of this
    // new appointment
    const hourStart = startOfHour(parseISO(date));
    // parseISO will transform "2019-07-01T19:00:00-03:00" to Date Object
    // startOfHour will convert 19:30:43 into 19:00 (it will round in a full hour)

    // verifying if passed date is before than current data
    if (isBefore(hourStart, new Date())) {
      return res.status(400).json({ error: 'Past dates are not permitted' });
    }

    // verifying if the provider has another appointment within the requested time
    const checkAvailability = await Appointment.findOne({
      where: {
        provider_id,
        canceled_at: null,
        date: {
          [Op.between]: [startOfHour(hourStart), endOfHour(hourStart)],
        },
      },
    });

    if (checkAvailability) {
      return res
        .status(400)
        .json({ error: 'Appointment date is not available' });
    }

    // creating appointment
    const appointment = await Appointment.create({
      user_id: req.userId,
      provider_id,
      date,
    });

    // notifying appointment provider
    const user = await User.findByPk(req.userId);
    const formatDate = format(
      hourStart,
      "do MMMM',' yyyy', at' hh':'mm"
      // "'dia' dd 'de' MMMM', as' H:mm'h"
      // if you want to usedate time configured on another locale, please import firstly
      // import pt from 'date-fns/locale/pt'; (for PT config)
      // { localet: pt }
    );

    await Notification.create({
      content: `New schedule with ${user.name} on ${formatDate}`,
      user: provider_id,
    });

    return res.json(appointment);
  }

  async delete(req, res) {
    // User can delete an appointment only 2 hours before the scheduled time

    const appointment = await Appointment.findByPk(req.params.id, {
      include: [
        // getting provider's infos
        {
          model: User,
          as: 'provider',
          attributes: ['name', 'email'],
        },
        {
          model: User,
          as: 'user',
          attributes: ['name'],
        },
      ],
    });

    // checking if user (logged one) is owner of appointment
    if (appointment.user_id !== req.userId) {
      return res.status(401).json({
        error: 'You do not have permission to cancel this appointment',
      });
    }

    // verify time
    // subHours will return subtract X hours from the time
    // appointment.time does not need to be parseISO
    const dateWithSub = subHours(appointment.date, 2);
    // verify if dateWithSub is 2 hour less than current time
    if (isBefore(dateWithSub, new Date())) {
      return res
        .status(400)
        .json({ error: 'You cam only cancel appointment 2 hours in advance.' });
    }

    appointment.canceled_at = new Date();

    await appointment.save();

    // sending Mail
    await Mail.sendMail({
      to: `${appointment.provider.name} <${appointment.provider.email}>`,
      subject: 'Appointment canceled',
      // text: 'You have a new cancelation', // could be pure txt
      // html: '<content>'; //could be a very short HTML
      /** USING HANDLEBARS */
      template: 'cancellation', // not necessary to inform .hbs
      context: {
        // here we set all variables our template is waiting for
        provider: appointment.provider.name,
        user: appointment.user.name,
        date: format(appointment.date, "do MMMM',' yyyy', at' hh':'mm"),
      },
    });

    return res.json(appointment);
  }
}

export default new AppointmentController();
