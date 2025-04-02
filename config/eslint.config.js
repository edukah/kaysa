import js from '@eslint/js';
import importPlugin from 'eslint-plugin-import';
import nPlugin from 'eslint-plugin-n';
import promisePlugin from 'eslint-plugin-promise';

export default [
  {
    ignores: ['node_modules', 'dist', 'build']
  },
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        document: 'readonly',
        window: 'readonly',
        console: 'readonly'
      }
    },
    plugins: {
      import: importPlugin,
      n: nPlugin,
      promise: promisePlugin
    },
    rules: {
      semi: ['error', 'always'],
      'space-before-function-paren': ['error', 'always'],
      'no-console': 'off',
      'no-debugger': 'warn',
      'no-var': 'error',
      'prefer-const': 'error',
      'no-new': 'warn',
      'import/no-absolute-path': 'error',
      'multiline-ternary': ['error', 'never'],
      'no-unused-vars': 'off'
    }
  }
];
