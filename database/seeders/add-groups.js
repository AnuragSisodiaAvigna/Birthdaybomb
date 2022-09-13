"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const groups = [];

    groups.push({
      group_id: 1,
      group_name: `Admin`,
    });

    groups.push({
      group_id: 2,
      group_name: `Customer`,
    });

    groups.push({
      group_id: 3,
      group_name: `Seller`,
    });

    await queryInterface.bulkInsert("groups", groups, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("groups", null, {});
  },
};
