import Sequelize, { Model } from 'sequelize';

class File extends Model {
  static init(sequelize) {
    // this method will be called automatically by Sequelize
    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            // here we are transforming 'url's output
            return `${process.env.APP_URL}/files/${this.path}`;
          },
        },
      },
      {
        sequelize,
      }
    );

    return this; // ALWAYS we need to return this object in init() method.
  }
}

export default File;
