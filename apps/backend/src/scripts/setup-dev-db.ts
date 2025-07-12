import { Sequelize } from 'sequelize';
import { initializeDatabase } from '../models';

async function createDatabaseIfNotExists(
  databaseUrl: string
): Promise<boolean> {
  // Extract database name from URL
  const url = new URL(databaseUrl);
  const databaseName = url.pathname.slice(1); // Remove leading slash

  // Connect to default postgres database to create our development database
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
      'SELECT 1 FROM pg_database WHERE datname = $1',
      {
        bind: [databaseName],
        type: 'SELECT',
      }
    );

    const databaseExists = Array.isArray(results) && results.length > 0;

    if (!databaseExists) {
      console.log(`🔄 Creating database: ${databaseName}`);
      try {
        await defaultSequelize.query(`CREATE DATABASE "${databaseName}"`);
        console.log(`✅ Database "${databaseName}" created successfully`);
        return false; // Database was created
      } catch (createError: unknown) {
        // Check if the error is because database already exists
        if (
          createError &&
          typeof createError === 'object' &&
          'parent' in createError
        ) {
          const parent = (createError as { parent?: { code?: string } }).parent;
          if (parent?.code === '42P04') {
            console.log(
              `✅ Database "${databaseName}" already exists (caught during creation)`
            );
            return true; // Database already exists
          }
        }
        throw createError;
      }
    } else {
      console.log(`✅ Database "${databaseName}" already exists`);
      return true; // Database already exists
    }
  } catch (error) {
    console.error('❌ Error checking/creating database:', error);
    throw error;
  } finally {
    await defaultSequelize.close();
  }
}

async function setupDevDatabase() {
  // Set NODE_ENV to development to ensure we use the development database
  process.env['NODE_ENV'] = 'development';

  try {
    console.log('🔄 Setting up development database...');

    const databaseUrl = process.env['DATABASE_URL'];
    if (!databaseUrl) {
      throw new Error(
        'No DATABASE_URL found. Please set DATABASE_URL in your .env file'
      );
    }

    console.log('📊 Using database URL:', databaseUrl);

    // Create database if it doesn't exist
    const databaseAlreadyExists = await createDatabaseIfNotExists(databaseUrl);

    if (databaseAlreadyExists) {
      console.log(
        '⏭️  Skipping database initialization - database already exists'
      );
      console.log('✅ Development database setup completed successfully!');
      process.exit(0);
    }

    // Initialize the database with models only if database was created
    await initializeDatabase();
    console.log('✅ Development database setup completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Failed to setup development database:', error);
    process.exit(1);
  }
}

setupDevDatabase();
