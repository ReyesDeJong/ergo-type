import sequelize from '../config/database';
import Keyboard from './Keyboard';
import User from './User';

export const initializeDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
    throw error;
  }
};

export { Keyboard, User };
export default sequelize;
