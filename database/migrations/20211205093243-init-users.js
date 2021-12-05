'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    const { INTEGER ,STRING ,DATE } = Sequelize
    await queryInterface.createTable('chooses', {
      id: {type: INTEGER, primaryKey: true, autoIncrement: true },
      course_id: INTEGER,
      user_name: STRING,
      day: INTEGER,
      time: INTEGER,
      updated_at: DATE,
      created_at: DATE
    })
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('chooses');
  }
};
