import Sequelize from 'sequelize'; // Sequelize will be responsible to make the connection with DB
import mongoose from 'mongoose';
import databaseConfig from '../config/database';

import User from '../app/models/User';
import File from '../app/models/File';
import Appointment from '../app/models/Appointment';

const models = [User, File, Appointment];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  // init() will make the connection and link with the Models
  init() {
    this.connection = new Sequelize(databaseConfig); // here we are connecting to DB

    // this.connection is the variable that is waited inside each init() method from each Model

    // now we need to import our models and assign in an array called models

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }

  // preparing connection with MongoDB
  mongo() {
    this.mongoConnection = mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useFindAndModify: true,
    });

    // DO NOT FORGET to execute it in this.init()
  }
}

export default new Database();
