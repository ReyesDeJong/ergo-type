import 'dotenv/config';

export default {
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
