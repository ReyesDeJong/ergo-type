# Database Seeders

This project uses Sequelize seeders to populate the database with initial data for development and testing environments.

## Overview

Seeders are timestamped files that run in chronological order to insert sample data into your database. They provide a consistent way to set up your database with known data for development and testing.

## Available Commands

### Run All Seeders
```bash
npm run db:seed
```
Runs all seeders in chronological order.

### Undo Last Seeder
```bash
npm run db:seed:undo
```
Undoes the most recently run seeder.

### Undo All Seeders
```bash
npm run db:seed:undo:all
```
Undoes all seeders in reverse chronological order.

### Create New Seeder
```bash
npm run db:create-seeder -- --name seeder-name
```
Creates a new seeder file with the specified name.

## Seeder Structure

Seeders are located in `src/seeders/` and follow this structure:

```typescript
import { Keyboard } from '../models';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up() {
    // Code to insert data
    const sampleKeyboards = [
      { name: 'ErgoDox EZ' },
      { name: 'Moonlander Mark I' },
    ];

    await Keyboard.bulkCreate(sampleKeyboards);
  },

  async down() {
    // Code to remove data
    await Keyboard.destroy({ where: {} });
  },
};
```

## Best Practices

### 1. Use Models Instead of Raw Queries
```typescript
// ✅ Good - Uses model with validation
await Keyboard.bulkCreate(sampleKeyboards);

// ❌ Avoid - Raw queries bypass validation
await queryInterface.bulkInsert('keyboards', data);
```

### 2. Include Down Method
Always implement the `down()` method to make seeders reversible:
```typescript
async down() {
  await Keyboard.destroy({ where: {} });
}
```

### 3. Use Meaningful Data
Seed with realistic, useful data that helps with development and testing.

### 4. Handle Dependencies
If seeders depend on each other, ensure they run in the correct order by using appropriate timestamps.

### 5. Environment Safety
Seeders run in all environments by default. Add environment checks if needed:
```typescript
async up() {
  if (process.env.NODE_ENV === 'production') {
    console.log('Skipping seeder in production');
    return;
  }
  // ... seeding logic
}
```

## Current Seeders

### `20241201000000-demo-keyboards.ts`
Populates the database with sample ergonomic keyboards:
- ErgoDox EZ
- Moonlander Mark I
- Kinesis Advantage360
- Dactyl Manuform

## Migration vs Seeder

- **Migrations**: Change database structure (tables, columns, indexes)
- **Seeders**: Populate database with data

Use migrations for schema changes and seeders for data insertion.

## Troubleshooting

### Seeder Not Running
1. Check that the seeder file has the correct timestamp format
2. Ensure the file is in the `src/seeders/` directory
3. Verify the seeder hasn't already been run

### Undo Not Working
1. Check that the `down()` method is properly implemented
2. Ensure the seeder was actually run before trying to undo it

### TypeScript Issues
1. Make sure the seeder file has `.ts` extension
2. Verify imports are correct
3. Check that models are properly exported from `src/models/index.ts`
