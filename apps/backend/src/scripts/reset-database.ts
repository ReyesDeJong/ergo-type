import { Keyboard } from '../models';
import { initializeDatabase } from '../models';

async function resetDatabase() {
  try {
    console.log('🔄 Resetting database...');
    await initializeDatabase();

    await Keyboard.destroy({ where: {} });

    console.log('✅ Database reset successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Failed to reset database:', error);
    process.exit(1);
  }
}

resetDatabase();
