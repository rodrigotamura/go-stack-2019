import Sequelize, { Model } from 'sequelize';
import { isBefore, subHours } from 'date-fns';

class Appointment extends Model {
  static init(sequelize) {
    // this method will be called automatically by Sequelize
    super.init(
      {
        date: Sequelize.DATE,
        canceled_at: Sequelize.DATE,
        // we are not reffering user_id neither provider_id
        // because we will implement static associate
        // in order to build this relationship
        past: {
          // return false if given date is before current date
          type: Sequelize.VIRTUAL,
          get() {
            // when call this field it will show formatted according to this
            return isBefore(this.date, new Date());
          },
        },
        cancelable: {
          // if appointment is cancelable or not
          // user can not cancel any appointment less than 2 hour of appointment time
          // let's calc with subHours, subtracting 2
          type: Sequelize.VIRTUAL,
          get() {
            return isBefore(new Date(), subHours(this.date, 2));
          },
        },
      },
      {
        sequelize,
      }
    );

    return this; // ALWAYS we need to return this object in init() method.
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.User, { foreignKey: 'provider_id', as: 'provider' });

    // TIPS: When a Model has more than one relationship with the same Model,
    // it is very important to give an alias for each by 'as' property.
    // If we do not por 'as', Sequelizes will confuse itself.
  }
}

export default Appointment;
