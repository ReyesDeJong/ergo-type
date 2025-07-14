import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  js.configs.recommended,
  tseslint.configs.recommended,
  {
    ignores: ['dist/**', 'node_modules/**', 'coverage/**'],
  },
  // JavaScript files (migrations, seeders, config files)
  {
    files: ['**/*.js', 'migrations/**/*.js', 'seeders/**/*.js'],
    languageOptions: {
      sourceType: 'commonjs',
      ecmaVersion: 2022,
      globals: {
        ...globals.node,
        require: 'readonly',
        module: 'readonly',
        process: 'readonly',
        console: 'readonly',
      },
    },
  },
  // TypeScript files
  {
    files: ['**/*.{ts,mts,cts}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.es2021,
        require: 'readonly',
        module: 'readonly',
        process: 'readonly',
        console: 'readonly',
      },
    },
  },
  // Test files
  {
    files: [
      '**/*.test.{js,mjs,cjs,ts,mts,cts}',
      'test/**/*.{js,mjs,cjs,ts,mts,cts}',
    ],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
        require: 'readonly',
        module: 'readonly',
        process: 'readonly',
        console: 'readonly',
      },
    },
  }
);
