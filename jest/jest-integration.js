module.exports = {
  globals: {
    ENV_FILE: 'environments/.env.test',
  },
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '../src',
  testEnvironment: 'node',
  testRegex: '.int-spec.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  setupFilesAfterEnv: ['../jest/jest.setup.ts'],
};
