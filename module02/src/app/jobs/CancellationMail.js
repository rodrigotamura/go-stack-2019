import { format, parseISO } from 'date-fns';
import Mail from '../../lib/Mail';

class CancellationMail {
  get key() {
    // when I declare a method with 'get' it's similar
    // to declare a variavel key
    // When we import CancellationMail, we can use CancellationMail.key
    // without use CancellationMail.key()
    // It's very nice because we do not need make constructor to return variables.
    return 'CancellationMail';
    // we are returning a unique key for this JOB called CancellationMail
  }

  async handle({ data }) {
    /**
     * It will define the tasks that will be executed when this process will be executed
     * If a queue has 10 tasks, each task will execute this handle()
     */

    const { appointment } = data;

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
        date: format(
          parseISO(appointment.date),
          "do MMMM',' yyyy', at' hh':'mm"
        ),
      },
    });
  }
}

export default new CancellationMail();
