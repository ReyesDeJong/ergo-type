'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'keyboards',
      [
        {
          name: 'ErgoDox EZ',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Moonlander Mark I',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Kinesis Advantage360',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Dactyl Manuform',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('keyboards', null, {});
  },
};
