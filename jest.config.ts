import type { JestConfigWithTsJest } from 'ts-jest'

const config: JestConfigWithTsJest = {
  roots: ['<rootDir>', '<rootDir>/src'],
  moduleDirectories: ['node_modules'],
  moduleNameMapper: {
    '^@data/(.*)$': '<rootDir>/src/data/$1',
    '^@domain/(.*)$': '<rootDir>/src/domain/$1',
    '^@infra/(.*)$': '<rootDir>/src/infra/$1',
    '^@main/(.*)$': '<rootDir>/src/main/$1',
    '^@presentation/(.*)$': '<rootDir>/src/presentation/$1',
    '^@validation/(.*)$': '<rootDir>/src/validation/$1',
  },
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/main/**',
    '!<rootDir>/src/**/*-protocols*',
    '!**/protocols/**',
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
