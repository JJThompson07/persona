import pluginVue from 'eslint-plugin-vue';
import vueTsEslintConfig from '@vue/eslint-config-typescript';
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting';

export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
  },

  {
    name: 'app/ignores',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
  },

  // 1. Vue Essential Rules
  ...pluginVue.configs['flat/essential'],

  // 2. TypeScript Support
  ...vueTsEslintConfig(),

  // 3. Turn off rules that conflict with Prettier
  skipFormatting,
];
