'use strict';
const faker = require('faker');
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'staff@vermillion.com',
        username: 'admin',
        hashedPassword: '$2a$10$kBcrPjt4Y5L0HBfXerGZ0eOEvUkbLGvyxXzfEwJ4z/Evt.vGGSwBK'
      },
      {
        email: 'demo@user.io',
        username: 'demoMan',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: faker.internet.email(),
        username: 'UselessDemoUnknownPassword1',
        hashedPassword: bcrypt.hashSync(faker.internet.password())
      },
      {
        email: faker.internet.email(),
        username: 'UselessDemoUnknownPassword2',
        hashedPassword: bcrypt.hashSync(faker.internet.password())
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['demoMan', 'UselessDemoUnknownPassword1', 'UselessDemoUnknownPassword2'] }
    }, {});
  }
};
