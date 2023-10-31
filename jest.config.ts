import type { Config } from 'jest'

const config: Config = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/**/protocols/*.ts',
    '!<rootDir>/src/presentation/controllers/signup/signup-protocols.ts',
  ],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  preset: '@shelf/jest-mongodb',
  transform: {
    '.+\\.ts$': 'ts-jest',
  },
}

export default config
