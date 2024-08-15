import eslintPluginJsonc from 'eslint-plugin-jsonc';

export default [
  ...eslintPluginJsonc.configs['flat/recommended-with-jsonc'],
  {
    files: [
      'Testreglar/**/*.json',
      'Mal/**/*.json',
      'Utdatert/**/*.json'
    ],
  }
];