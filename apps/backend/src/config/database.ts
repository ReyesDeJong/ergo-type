import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// Environment-specific database URLs
const getDatabaseUrl = () => {
  const nodeEnv = process.env['NODE_ENV'] || 'development';

  switch (nodeEnv) {
    case 'test':
      return process.env['TEST_DATABASE_URL'] || process.env['DATABASE_URL'];
    case 'development':
      return process.env['DATABASE_URL'];
    case 'production':
      return process.env['DATABASE_URL'];
    default:
      return process.env['DATABASE_URL'];
  }
};

const databaseUrl = getDatabaseUrl();
if (!databaseUrl) {
  throw new Error(
    `DATABASE_URL environment variable is required for ${process.env['NODE_ENV'] || 'development'} environment`
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
