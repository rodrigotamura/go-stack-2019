import nodemailer from 'nodemailer';
import { resolve } from 'path'; // important if we want to go in a specific directory
import exphbs from 'express-handlebars';
import nodemailerhbs from 'nodemailer-express-handlebars';
import mailConfig from '../config/mail';

class Mail {
  constructor() {
    const { host, port, secure, auth } = mailConfig;

    // transporter is the name that Node call to something that send e-mail
    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: auth.user ? auth : null,
    });

    // Handlebars
    this.configureTemplates();
  }

  configureTemplates() {
    const viewPath = resolve(__dirname, '..', 'app', 'views', 'emails'); // where are our templates
    this.transporter.use(
      'compile', // how do we compile the formatation of our message
      nodemailerhbs({
        viewEngine: exphbs.create({
          layoutsDir: resolve(viewPath, 'layouts'),
          partialsDir: resolve(viewPath, 'partials'),
          defaultLayout: 'default', // it is in /layout/default.hbs
          extname: '.hbs', // which extension are we using?
        }),

        viewPath,
        extName: '.hbs',
      })
    );
  }

  sendMail(message) {
    /**
     * This method is responsible to send the messages
     */

    // Ok, but why do we created a method called sendMAil() returning the method
    // transporter.sendMail(), and why do not we call it directly in our controller?
    // We defined some variables in /src/config/Mail.js
    return this.transporter.sendMail({
      ...mailConfig.default,
      ...message,
    });
  }
}

export default new Mail();
