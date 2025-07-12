import { initializeDatabase } from '../models';
import sequelize from '../config/database';

async function syncDatabase() {
  try {
    console.log('🔄 Syncing database...');

    // Check environment before performing destructive operations
    if (process.env['NODE_ENV'] !== 'development') {
      console.log('⚠️  Skipping database sync in non-development environment');
      process.exit(0);
    }

    // First authenticate the connection
    await initializeDatabase();

    // Then sync the schema (for development only)
    await sequelize.sync({ alter: true });
    console.log('✅ Database synced successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Failed to sync database:', error);
    process.exit(1);
  }
}

syncDatabase();
