import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// Use TEST_DATABASE_URL for test environment, DATABASE_URL for others
const databaseUrl =
  process.env['NODE_ENV'] === 'test'
    ? process.env['TEST_DATABASE_URL']
    : process.env['DATABASE_URL'];

if (!databaseUrl) {
  throw new Error(
    `Database URL environment variable is required for ${process.env['NODE_ENV']} environment. ` +
      `Please set ${process.env['NODE_ENV'] === 'test' ? 'TEST_DATABASE_URL' : 'DATABASE_URL'}`
  );
}

const sequelize = new Sequelize(databaseUrl, {
  dialect: 'postgres',
  logging: process.env['NODE_ENV'] === 'development' ? console.log : false,
  define: {
    underscored: true,
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

export default sequelize;
