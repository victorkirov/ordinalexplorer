import type { Config } from 'jest'

const config: Config = {
  verbose: true,
  testPathIgnorePatterns: ['<rootDir>/public/', '<rootDir>/node_modules/'],
  moduleNameMapper: {
    '^.+\\.(css|less|scss)$': 'identity-obj-proxy',
    '^@src(.*)$': '<rootDir>/src/$1',
    '^@components(.*)$': '<rootDir>/src/components/$1',
  },
  coveragePathIgnorePatterns: ['node_modules', '@import'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  modulePaths: ['<rootDir>'],
  testEnvironment: 'jsdom',
  reporters: ['default'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
}

export default config
