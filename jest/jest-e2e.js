module.exports = {
  globals: {
    ENV_FILE: 'environments/.env.test',
  },
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '../test',
  testEnvironment: 'node',
  testRegex: '.e2e-spec.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  setupFilesAfterEnv: ['../jest/jest.setup.ts'],
};
