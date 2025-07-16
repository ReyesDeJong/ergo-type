import { Sequelize } from 'sequelize';
import { initializeDatabase } from '../models';

async function createDatabaseIfNotExists(databaseUrl: string) {
  // Extract database name from URL
  const url = new URL(databaseUrl);
  const databaseName = url.pathname.slice(1); // Remove leading slash

  // Connect to default postgres database to create our test database
  const defaultUrl = databaseUrl.replace(`/${databaseName}`, '/postgres');
  const defaultSequelize = new Sequelize(defaultUrl, {
    dialect: 'postgres',
    logging: false,
  });

  try {
    await defaultSequelize.authenticate();
    console.log('✅ Connected to PostgreSQL server');

    // Check if database exists using a more reliable method
    const [results] = await defaultSequelize.query(
      'SELECT datname FROM pg_database WHERE datname = :databaseName',
      {
        replacements: { databaseName },
        type: 'SELECT',
      }
    );

    const databaseExists = Array.isArray(results) && results.length > 0;

    if (!databaseExists) {
      console.log(`🔄 Creating database: ${databaseName}`);
      await defaultSequelize.query(`CREATE DATABASE "${databaseName}"`);
      console.log(`✅ Database "${databaseName}" created successfully`);
    } else {
      console.log(`✅ Database "${databaseName}" already exists`);
    }
  } catch (error) {
    console.error('❌ Error checking/creating database:', error);
    throw error;
  } finally {
    await defaultSequelize.close();
  }
}

async function setupTestDatabase() {
  process.env['NODE_ENV'] = 'test';

  try {
    console.log('🔄 Setting up test database...');

    const databaseUrl = process.env['TEST_DATABASE_URL'];
    if (!databaseUrl) {
      throw new Error(
        'No database URL found. Please set TEST_DATABASE_URL or DATABASE_URL'
      );
    }

    console.log('📊 Using database URL:', databaseUrl);

    // Create database if it doesn't exist
    await createDatabaseIfNotExists(databaseUrl);

    // Initialize the database with models and create tables
    await initializeDatabase();

    // Import sequelize instance and sync to create tables
    const sequelize = (await import('../config/database')).default;
    await sequelize.sync({ force: true });

    console.log('✅ Test database setup completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Failed to setup test database:', error);
    process.exit(1);
  }
}

setupTestDatabase();
