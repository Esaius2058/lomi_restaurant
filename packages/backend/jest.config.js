export default {
  testEnvironment: 'node',
  transform: {},
  //extensionsToTreatAsEsm: ['.js'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  testMatch: ['**/tests/**/*.test.js'], // pick up test files properly
  roots: ['<rootDir>/src'],
};