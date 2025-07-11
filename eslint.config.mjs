import js from "@eslint/js";
import globals from "globals";
import tseslint from "@typescript-eslint/eslint-plugin";
import tseslintParser from "@typescript-eslint/parser";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    ...js.configs.recommended,
    languageOptions: { globals: globals.browser },
  },

  {
    files: ["apps/backend/**/*.{js,mjs,cjs,ts,mts,cts}"],
    ...js.configs.recommended,
    languageOptions: { globals: globals.node },
  },

  {
    files: ["apps/backend/**/*.test.{js,mjs,cjs,ts,mts,cts}", "apps/backend/**/test/**/*.{js,mjs,cjs,ts,mts,cts}"],
    ...js.configs.recommended,
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest
      }
    },
  },

  {
    files: ["**/*.{ts,tsx,mts,cts}"],
    languageOptions: {
      parser: tseslintParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
    },
  },

  {
    files: ["**/*.{jsx,tsx}"],
    plugins: {
      react: pluginReact,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      ...pluginReact.configs.recommended.rules,
    },
  },
]);
