/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'jsdom',
  transformIgnorePatterns: [
    '<rootDir>/bower_components/',
    '<rootDir>/node_modules/',
  ],
};
