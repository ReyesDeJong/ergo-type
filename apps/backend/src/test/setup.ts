import sequelize from '../config/database';
import { beforeAll, afterAll } from '@jest/globals';

beforeAll(async () => {
  if (process.env['NODE_ENV'] !== 'test') {
    throw new Error('Test setup should only run in test environment');
  }

  if (!process.env['TEST_DATABASE_URL']) {
    throw new Error(
      'TEST_DATABASE_URL environment variable is required for tests'
    );
  }

  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});
