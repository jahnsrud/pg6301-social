module.exports = {
  clearMocks: true,
  collectCoverageFrom: [
    "src/**/*.{js,jsx}",
    "!src/**/__tests__/*"
  ],

  roots: [
    '<rootDir>/src/'
  ],

  testEnvironment: 'node',

  testMatch: [
    "**/__tests__/*.test.js"
  ],
  moduleNameMapper: {
    '@/(.*)$': '<rootDir>/src/$1'
  },
  setupFilesAfterEnv: ["<rootDir>/jest-setup.js"]
};