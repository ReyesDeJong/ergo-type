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

  try {
    // First authenticate the connection
    await sequelize.authenticate();
    console.log('✅ Test database connection established');

    // Then sync the schema (create tables)
    await sequelize.sync({ force: true });
    console.log('✅ Test database schema synced');
  } catch (error) {
    console.error('❌ Test database setup failed:', error);
    throw error;
  }
});

afterAll(async () => {
  // Clean up and close the database connection
  await sequelize.close();
});
