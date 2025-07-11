#!/usr/bin/env node

const { execSync } = require('child_process');

const migrationName = process.argv[2];

if (!migrationName) {
  console.error('Usage: node create-migration.js <migration-name>');
  console.error('Example: node create-migration.js add-user-table');
  process.exit(1);
}

try {
  const command = `npx sequelize-cli migration:generate --name ${migrationName}`;
  console.log(`Creating migration: ${migrationName}`);
  execSync(command, { stdio: 'inherit' });
  console.log('Migration created successfully!');
} catch (error) {
  console.error('Error creating migration:', error.message);
  process.exit(1);
}
