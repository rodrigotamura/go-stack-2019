import Sequelize from 'sequelize'; // Sequelize will be responsible to make the connection with DB
import databaseConfig from '../config/database';

import User from '../app/models/User';

const models = [User];

class Database {
  constructor() {
    this.init();
  }

  // init() will make the connection and link with the Models
  init() {
    this.connection = new Sequelize(databaseConfig); // here we are connecting to DB

    // this.connection is the variable that is waited inside each init() method from each Model

    // now we need to import our models and assign in an array called models

    models.map(model => model.init(this.connection));
  }
}

export default new Database();
