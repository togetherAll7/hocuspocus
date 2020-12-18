module.exports = {
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  env: {
    es6: true,
    node: true,
  },
  overrides: [
    {
      files: [
        './**/*.ts',
        './**/*.js',
        './**/*.vue',
      ],
      plugins: [
        'html',
        'mocha',
        '@typescript-eslint',
      ],
      env: {
        mocha: true,
      },
      globals: {
        document: false,
        window: false,
        NodeJS: false,
      },
      extends: [
        'plugin:mocha/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:vue/strongly-recommended',
        'airbnb-base',
      ],
      rules: {
        'no-alert': 'off',
        'no-shadow': 'off',
        'no-console': ['warn', { allow: ['warn', 'error'] }],
        semi: ['error', 'never'],
        'import/extensions': 'off',
        'import/no-extraneous-dependencies': 'off',
        'import/no-unresolved': 'off',
        'import/no-dynamic-require': 'off',
        'arrow-parens': ['error', 'as-needed'],
        'padded-blocks': 'off',
        'class-methods-use-this': 'off',
        'global-require': 'off',
        'func-names': ['error', 'never'],
        'arrow-body-style': 'off',
        'max-len': 'off',
        'no-param-reassign': 'off',
        'import/prefer-default-export': 'off',
        'consistent-return': 'off',
        'no-redeclare': 'off',
        '@typescript-eslint/no-redeclare': ['error'],
        'no-unused-vars': 'off',
        // '@typescript-eslint/no-unused-vars': ['error'],
        // TODO: remove
        '@typescript-eslint/no-unused-vars': 'off',
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': ['error'],
        'no-dupe-class-members': 'off',
        '@typescript-eslint/no-dupe-class-members': ['error'],
        'lines-between-class-members': 'off',
        '@typescript-eslint/lines-between-class-members': ['error'],
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-empty-interface': 'off',
        '@typescript-eslint/explicit-module-boundary-type': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/ban-types': 'off',
        '@typescript-eslint/comma-dangle': ['error', 'always-multiline'],
        '@typescript-eslint/explicit-module-boundary-types': 'off',
      },
    },
  ],
}
