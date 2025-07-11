import { initializeDatabase } from '../models';

async function syncDatabase() {
  try {
    console.log('🔄 Syncing database...');
    await initializeDatabase();
    console.log('✅ Database synced successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Failed to sync database:', error);
    process.exit(1);
  }
}

syncDatabase();
