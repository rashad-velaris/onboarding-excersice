module.exports = {
  testEnvironment: 'node',
  collectCoverageFrom: [
    'src/services/*.js',
    'src/validators/*.js',
    '!src/repositories/*',
    '!src/config/*',
    '!src/client/*',
    '!src/database/*',
    '!src/middlewares/*',
    '!src/exceptions/*',
    '!src/connectors/*',
    '!src/resources/*',
    '!src/routes/*',
    '!src/controllers/*',
    '!src/*'
  ],
  coverageThreshold: {
    './src/': {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90
    }
  },
  moduleDirectories: ['node_modules', 'src'],
  modulePathIgnorePatterns: [],
  testPathIgnorePatterns: ['<rootDir>/node_modules/']
};
