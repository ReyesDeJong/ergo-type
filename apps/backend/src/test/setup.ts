import { beforeAll, afterAll } from '@jest/globals';
import sequelize from '../config/database';

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

  console.log('✅ Test environment configured');
  console.log('📊 Using test database:', process.env['TEST_DATABASE_URL']);
});

afterAll(async () => {
  // Close the database connection to prevent Jest from hanging
  await sequelize.close();
  console.log('🔌 Database connection closed');
});
