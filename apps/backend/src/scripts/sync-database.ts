import { initializeDatabase } from '../models';
import sequelize from '../config/database';

async function syncDatabase() {
  try {
    console.log('🔄 Syncing database...');

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
