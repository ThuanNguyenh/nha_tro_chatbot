'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.addColumn('rooms', 'address', {
      type: Sequelize.STRING,
      allowNull: false
    });

    await queryInterface.addColumn('rooms', 'acreage', {
      type: Sequelize.INTEGER,
      allowNull: false
    });
     
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
