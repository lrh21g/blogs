import antfu from '@antfu/eslint-config'

export default antfu(
  {
    typescript: true,
    formatters: {
      /**
       * Format CSS, LESS, SCSS files, also the `<style>` blocks in Vue
       * By default uses Prettier
       */
      css: true,
      /**
       * Format HTML files
       * By default uses Prettier
       */
      html: true,
      /**
       * Format Markdown files
       * Supports Prettier and dprint
       * By default uses Prettier
       */
      markdown: 'prettier',
    },
    lessOpinionated: true,
    ignores: [
      '**/*.md/*.html',
      '**/*.md/*.js',
      '**/*.md/*.ts',
      '**/*.md/*.vue',
      '**/*.md/*.jsx',
      '**/*.md/*.tsx',
      '**/*.md/*.css',
    ],
  },
  {
    rules: {
      'no-console': 'off',
      'eslint-comments/no-unlimited-disable': 'off',
      'style/max-statements-per-line': 'off',
    },
  },
)
