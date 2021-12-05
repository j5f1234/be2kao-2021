'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    const { INTEGER,STRING,DATE } = Sequelize
    await queryInterface.createTable('users', {
      id: {type: INTEGER, primaryKey: true, autoIncrement: true},
      name: STRING,
      number: INTEGER,
      password: STRING,
      updated_at: DATE,
      created_at: DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('users');
  }
};
