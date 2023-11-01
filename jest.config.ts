import type { Config } from 'jest'

const config: Config = {
  roots: ['<rootDir>', '<rootDir>/src'],
  moduleDirectories: ['node_modules'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/**/protocols/*.ts',
  ],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  preset: '@shelf/jest-mongodb',
  transform: {
    '.+\\.ts$': 'ts-jest',
  },
  watchPathIgnorePatterns: ['<rootDir>/globalConfig.json'],
}

export default config
