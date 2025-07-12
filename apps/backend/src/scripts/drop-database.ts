import 'dotenv/config';
import { Sequelize } from 'sequelize';

async function dropDatabaseHelper(databaseUrl: string) {
  // Extract database name from URL
  const url = new URL(databaseUrl);
  const databaseName = url.pathname.slice(1); // Remove leading slash

  // Connect to default postgres database to drop our development database
  const defaultUrl = databaseUrl.replace(`/${databaseName}`, '/postgres');
  const defaultSequelize = new Sequelize(defaultUrl, {
    dialect: 'postgres',
    logging: false,
  });

  try {
    await defaultSequelize.authenticate();
    console.log('✅ Connected to PostgreSQL server');

    // Drop the database if it exists
    console.log(`🗑️  Dropping database: ${databaseName}`);
    try {
      await defaultSequelize.query(`DROP DATABASE IF EXISTS "${databaseName}"`);
      console.log(`✅ Database "${databaseName}" dropped successfully`);
    } catch (dropError: unknown) {
      if (dropError && typeof dropError === 'object' && 'parent' in dropError) {
        const parent = (dropError as { parent?: { code?: string } }).parent;
        if (parent?.code === '3D000') {
          console.log(
            `ℹ️  Database "${databaseName}" doesn't exist, nothing to drop`
          );
        } else {
          throw dropError;
        }
      } else {
        throw dropError;
      }
    }
  } catch (error) {
    console.error('❌ Error dropping database:', error);
    throw error;
  } finally {
    await defaultSequelize.close();
  }
}

async function dropDatabase() {
  // Check environment before performing destructive operations
  if (process.env['NODE_ENV'] !== 'development') {
    console.log('⚠️  Skipping database drop in non-development environment');
    process.exit(0);
  }

  // Set NODE_ENV to development to ensure we use the development database
  process.env['NODE_ENV'] = 'development';

  try {
    console.log('🔄 Dropping development database...');

    const databaseUrl = process.env['DATABASE_URL'];
    if (!databaseUrl) {
      throw new Error(
        'No DATABASE_URL found. Please set DATABASE_URL in your .env file'
      );
    }

    console.log('📊 Using database URL:', databaseUrl);

    // Drop the database
    await dropDatabaseHelper(databaseUrl);

    console.log('✅ Development database dropped successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Failed to drop development database:', error);
    process.exit(1);
  }
}

dropDatabase();
