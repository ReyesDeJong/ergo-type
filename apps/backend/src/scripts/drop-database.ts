import 'dotenv/config';
import { Sequelize, QueryTypes } from 'sequelize';

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
      await defaultSequelize.query('DROP DATABASE IF EXISTS :databaseName', {
        replacements: { databaseName },
        type: QueryTypes.RAW,
      });
      console.log(`✅ Database "${databaseName}" dropped successfully`);
    } catch (dropError: unknown) {
      const isPostgresError = (
        err: unknown
      ): err is { parent?: { code?: string } } => {
        return Boolean(err && typeof err === 'object' && 'parent' in err);
      };

      if (isPostgresError(dropError) && dropError.parent?.code === '3D000') {
        console.log(
          `ℹ️  Database "${databaseName}" doesn't exist, nothing to drop`
        );
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
    console.log(
      `⚠️  Aborting database drop in ${process.env['NODE_ENV']} environment`
    );
    process.exit(0);
  }

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
