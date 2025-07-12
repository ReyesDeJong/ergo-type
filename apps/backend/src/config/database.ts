import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const databaseUrl = process.env['DATABASE_URL'];
if (!databaseUrl) {
  throw new Error(
    `DATABASE_URL environment variable is required for ${process.env['NODE_ENV']} environment`
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
