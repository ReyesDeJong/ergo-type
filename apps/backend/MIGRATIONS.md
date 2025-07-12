# Database Migrations

This project uses Sequelize migrations to manage database schema changes.

## Available Commands

### Migration Commands
- `npm run db:migrate` - Run all pending migrations
- `npm run db:migrate:undo` - Undo the last migration
- `npm run db:migrate:undo:all` - Undo all migrations
- `npm run db:migrate:status` - Check migration status
- `npm run db:create-migration -- --name <name>` - Create a new migration file

## Creating a New Migration

1. Generate a new migration:
   ```bash
   npm run db:create-migration -- --name add-user-table
   ```

2. Edit the generated migration file in `src/migrations/`

3. Run the migration:
   ```bash
   npm run db:migrate
   ```

## Migration File Structure

```javascript
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Migration logic here
    await queryInterface.createTable('table_name', {
      // column definitions
    });
  },

  async down(queryInterface, Sequelize) {
    // Rollback logic here
    await queryInterface.dropTable('table_name');
  }
};
```

## Important Notes

- Migration files are timestamped and run in order
- Always implement both `up` and `down` methods
- Use `queryInterface` for database operations
- Column names use snake_case (created_at, updated_at) due to `underscored: true` setting
- Test migrations by running them and then undoing them

## Environment Configuration

The migrations use the same database configuration as your application:
- Development: `DATABASE_URL`
- Test: `TEST_DATABASE_URL`
