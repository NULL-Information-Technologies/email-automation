import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'
import pluginQuery from '@tanstack/eslint-plugin-query'
export default defineConfig([

  globalIgnores(['dist', 'node_modules']),
...pluginQuery.configs['flat/recommended'],
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
    ],

    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser,
    },

    rules: {
      // allow dev flexibility
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',

      // ignore unused vars starting with _
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],

      // React dev sanity
      'react-refresh/only-export-components': 'off',

      // console logs are fine
      'no-console': 'off',

      // allow empty functions (common in callbacks)
      '@typescript-eslint/no-empty-function': 'off',
    },
  },
])