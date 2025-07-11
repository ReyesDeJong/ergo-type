require('dotenv').config();

module.exports = {
  development: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
    dialectOptions: {
      ssl:
        process.env.NODE_ENV === 'production'
          ? { rejectUnauthorized: false }
          : false,
    },
  },
  test: {
    url: process.env.TEST_DATABASE_URL || process.env.DATABASE_URL,
    dialect: 'postgres',
    dialectOptions: {
      ssl: false,
    },
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
    dialectOptions: {
      ssl: { rejectUnauthorized: false },
    },
  },
};
