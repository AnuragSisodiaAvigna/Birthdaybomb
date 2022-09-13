"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("groups", {
      group_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      group_name: {
        type: Sequelize.STRING,
        isAlpha: true,
        notEmpty: true,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("groups");
  },
};
