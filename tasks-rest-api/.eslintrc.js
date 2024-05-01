module.exports = {
  env: {
    node: true,
    es2020: true,
    'jest/globals': true
  },
  plugins: ['jest', 'prettier'],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  extends: ['eslint:recommended', 'airbnb-base', 'plugin:jest/recommended', 'plugin:prettier/recommended'],
  rules: {
    'class-methods-use-this': 'off',
    'import/prefer-default-export': 'off',
    'no-underscore-dangle': 'off',
    'prettier/prettier': ['error', { printWidth: 120 }]
  },
  globals: {
    jest: false,
    expect: false,
    describe: false,
    test: false,
    beforeAll: false,
    beforeEach: false,
    afterAll: false,
    afterEach: false
  }
};
