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

```javascript
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'table_name',
      [
        {
          column1: 'value1',
          column2: 'value2',
          created_at: new Date(),
          updated_at: new Date(),
        },
        // ... more records
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('table_name', null, {});
  },
};
```

## Best Practices

### 1. Use QueryInterface for Direct Database Operations
```javascript
// ✅ Good - Direct database insertion for seeding
await queryInterface.bulkInsert('keyboards', data);

// ✅ Also Good - Using models when you need validation
await Keyboard.bulkCreate(sampleKeyboards);
```

### 2. Include Down Method
Always implement the `down()` method to make seeders reversible:
```javascript
async down(queryInterface) {
  await queryInterface.bulkDelete('keyboards', null, {});
}
```

### 3. Use Meaningful Data
Seed with realistic, useful data that helps with development and testing.

### 4. Handle Dependencies
If seeders depend on each other, ensure they run in the correct order by using appropriate timestamps.

### 5. Environment Safety
Seeders run in all environments by default. Add environment checks if needed:
```javascript
async up(queryInterface) {
  if (process.env.NODE_ENV === 'production') {
    console.log('Skipping seeder in production');
    return;
  }
  // ... seeding logic
}
```

### 6. Include Timestamps
Always include `created_at` and `updated_at` fields when seeding data:
```javascript
{
  name: 'ErgoDox EZ',
  created_at: new Date(),
  updated_at: new Date(),
}
```

## Migration vs Seeder

- **Migrations**: Change database structure (tables, columns, indexes)
- **Seeders**: Populate database with data

Use migrations for schema changes and seeders for data insertion.

## Troubleshooting

### Seeder Not Running
1. Check that the seeder file has the correct timestamp format (`YYYYMMDDHHMMSS`)
2. Ensure the file is in the `src/seeders/` directory
3. Verify the seeder hasn't already been run
4. Check the database configuration in `src/config/database.config.js`

### Undo Not Working
1. Check that the `down()` method is properly implemented
2. Ensure the seeder was actually run before trying to undo it
3. Verify the table name in the `down()` method matches the one used in `up()`

### Common Issues
1. **Missing timestamps**: Always include `created_at` and `updated_at`
2. **Wrong table name**: Double-check table names match your models
3. **Database connection**: Ensure your database is running and accessible

## Example Workflow

```bash
# 1. Create a new seeder
npm run db:create-seeder -- --name add-more-keyboards

# 2. Edit the generated seeder file in src/seeders/

# 3. Run the seeder
npm run db:seed

# 4. If you need to undo
npm run db:seed:undo
```
