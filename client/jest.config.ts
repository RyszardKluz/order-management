import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  cache: true,
  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest',
  },
};

export default config;
