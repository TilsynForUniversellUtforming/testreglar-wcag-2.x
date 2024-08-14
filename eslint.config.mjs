import eslintPluginJsonc from 'eslint-plugin-jsonc';
import globals from 'globals';

export default [
  ...eslintPluginJsonc.configs['flat/recommended-with-jsonc'],
  {
    files: ['Testreglar/**/*.json'],
  }
];