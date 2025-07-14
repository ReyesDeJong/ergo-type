require('dotenv').config();

module.exports = {
  development: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
    dialectOptions: {
      ssl: false,
    },
  },
  test: {
    url: process.env.TEST_DATABASE_URL,
    dialect: 'postgres',
    dialectOptions: {
      ssl: false,
    },
  },
};
