module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('appointments', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      user_id: {
        // user who will be the client
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' }, // Foreign Key reference
        onUpdate: 'CASCADE', // when user is updated, this filed will be updated also
        onDelete: 'SET NULL', // when user is deleted, each user_id of appointment will be NULL
        allowNull: true,
      },
      provider_id: {
        // user who will be the provider
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' }, // Foreign Key reference
        onUpdate: 'CASCADE', // when image is updated, this filed will be updated also
        onDelete: 'SET NULL', // when image is deleted, this field will be NULL
        allowNull: true,
      },
      canceled_at: {
        type: Sequelize.DATE,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('appointments');
  },
};
