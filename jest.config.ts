import type { Config } from 'jest';
import nextJest from 'next/jest.js';
const createJestConfig = nextJest({ dir: './' });
const customJestConfig: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleDirectories: ['node_modules', '<rootDir>/'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^.+\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    '^.+\\.(png|jpg|jpeg|gif|webp|avif|svg)$':
      '<rootDir>/test/__mocks__/fileMock.ts',
  },
  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
};
export default createJestConfig(customJestConfig);
