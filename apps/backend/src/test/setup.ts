import sequelize from '../config/database';
import { beforeAll, afterAll } from '@jest/globals';

beforeAll(async () => {
  if (process.env['NODE_ENV'] !== 'test') {
    throw new Error('Test setup should only run in test environment');
  }

  // Ensure we're using the test database
  if (!process.env['TEST_DATABASE_URL']) {
    throw new Error(
      'TEST_DATABASE_URL environment variable is required for tests'
    );
  }

  // Sync the test database schema
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  // Clean up and close the database connection
  await sequelize.close();
});
