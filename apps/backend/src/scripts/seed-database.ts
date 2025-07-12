import { Keyboard } from '../models';
import { initializeDatabase } from '../models';

const sampleKeyboards = [
  {
    name: 'ErgoDox EZ',
  },
  {
    name: 'Kinesis Advantage360 Pro',
  },
  {
    name: 'Moonlander Mark I',
  },
];

async function seedDatabase() {
  try {
    console.log('🔄 Seeding database...');
    await initializeDatabase();

    if (process.env['NODE_ENV'] === 'development') {
      await Keyboard.destroy({ where: {} });
    } else {
      console.log('⚠️  Skipping data destruction in production environment');
      process.exit(0);
    }

    const createdKeyboards = await Keyboard.bulkCreate(sampleKeyboards);

    console.log(
      `✅ Database seeded successfully! Created ${createdKeyboards.length} keyboards.`
    );
    process.exit(0);
  } catch (error) {
    console.error('❌ Failed to seed database:', error);
    process.exit(1);
  }
}

seedDatabase();
