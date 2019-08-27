import Sequelize, { Model } from 'sequelize';

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
