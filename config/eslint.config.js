import js from '@eslint/js';
import importPlugin from 'eslint-plugin-import';
import nPlugin from 'eslint-plugin-n';
import promisePlugin from 'eslint-plugin-promise';

export default [
  // Basic ignores
  {
    ignores: [
      'node_modules',
      'dist', 
      'build'
    ]
  },

  // Recommended JavaScript rules
  js.configs.recommended,

  // Custom configuration
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
      // Basic syntax rules
      'semi': ['error', 'always'],
      'no-var': 'error',
      'prefer-const': 'error',
      'no-console': 'off',
      'no-debugger': 'warn',
      'no-new': 'off',
      'no-unused-vars': 'off',
      
      // Spacing rules
      'space-before-function-paren': ['error', 'always'],
      'multiline-ternary': ['error', 'never'],
      'newline-before-return': 'error',
      
      // Import rules
      'import/no-absolute-path': 'error',
      
      // Indentation rules  
      'indent': [
        'error', 
        2, 
        {
          "SwitchCase": 1
        }
      ],
      'no-mixed-spaces-and-tabs': ['error', 'smart-tabs'],
      
      // Brace style rules
      'brace-style': [
        'error', 
        '1tbs', 
        {
          "allowSingleLine": true
        }
      ],
      
      // Object formatting
      'object-curly-newline': [
        'error', 
        {
          'multiline': true,
          'consistent': true
        }
      ]
    }
  }
];