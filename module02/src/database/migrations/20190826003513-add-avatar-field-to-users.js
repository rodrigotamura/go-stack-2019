module.exports = {
  up: (queryInterface, Sequelize) => {
    //                               table      field
    return queryInterface.addColumn('users', 'avatar_id', {
      type: Sequelize.INTEGER,
      references: { model: 'files', key: 'id' }, // Foreign Key reference
      onUpdate: 'CASCADE', // when image is updated, this filed will be updated also
      onDelete: 'SET NULL', // when image is deleted, this field will be NULL
      allowNull: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('users', 'avatar_id');
  },
};
