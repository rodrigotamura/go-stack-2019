module.exports = {
  // Sequelize supports many kinds of DBs
  // If we want use PostGres, we need to install some packages:
  // $ yarn add pg pg-hstore
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'gobarber',
  define: {
    timestamps: true, // create automatically created_at and updated_at for each table

    // with underscored and underscoredAll will create our tables in underscore standard (not camelcase)
    underscored: true, // for tables names
    underscoredAll: true, // for fields names
  },
};
