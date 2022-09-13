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
        const users = [];

        users.push({
            user_id: 1,
            group_id: 1,
            name: "Admin",
            email: "admin@gmail.com",
            gender: "Male",
            contact_no: 9999999999,
            password: "321321321",
            age: 22,
            address: "Test address of Admin",
        });

        users.push({
            user_id: 2,
            group_id: 2,
            name: "Customer",
            email: "customer@gmail.com",
            gender: "Male",
            contact_no: 9999999998,
            password: "321321321",
            age: 23,
            address: "Test address of Customer",
        });

        users.push({
            user_id: 3,
            group_id: 3,
            name: "Buyer",
            email: "buyer@gmail.com",
            gender: "Male",
            contact_no: 9999999997,
            password: "321321321",
            age: 24,
            address: "Test address of Buyer",
        });



        await queryInterface.bulkInsert("users", users, {});
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete("users", null, {});
    },
};
