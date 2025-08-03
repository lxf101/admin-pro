// eslint.config.mjs
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import vuePlugin from 'eslint-plugin-vue';
import pluginPrettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default [
  {
    files: ['*.ts', '*.tsx', '*.vue'],
    ignores : ['node_modules', 'dist', '*.md', '.vscode', '.idea', '.husky', '.local', '/docs', '/public', '/bin', 'Dockerfile', 'types/*.d.ts'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        project: './tsconfig.eslint.json',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      vue: vuePlugin,
      prettier: pluginPrettier
    },
    rules: {
      'semi': ['error', 'always'],
      'quotes': ['error', 'single'],
      '@typescript-eslint/no-unused-vars': 'warn',
      'vue/multi-word-component-names': 'off',
      // 启用 Prettier 的格式规则
      'prettier/prettier': 'error',
    },
  },
  // 关闭 ESLint 中与 Prettier 冲突的规则
  {...prettierConfig},
];
