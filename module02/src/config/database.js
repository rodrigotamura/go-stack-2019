require('dotenv').config(); // or require('dotenv/config);

module.exports = {
  // Sequelize supports many kinds of DBs
  // If we want use PostGres, we need to install some packages:
  // $ yarn add pg pg-hstore
  dialect: 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  define: {
    timestamps: true, // create automatically created_at and updated_at for each table

    // with underscored and underscoredAll will create our tables in underscore standard (not camelcase)
    underscored: true, // for tables names
    underscoredAll: true, // for fields names
  },
};
