// const { pathsToModuleNameMapper } = require('ts-jest/utils');
// const { compilerOptions } = require('./tsconfig.json');
const { resolve } = require('path');
require('dotenv-flow').config();

module.exports = {
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json'
    }
  },
  testSequencer: '<rootDir>/__tests__/testSequencer.test.js',
  preset: 'ts-jest',
  transform: {
    '^.+\\.(ts|tsx|js)?$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest'
  },
  modulePaths: ['./'],
  roots: [
    //   "<rootDir>/src",
    '<rootDir>/__tests__'
  ],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|less|scss)$': '<rootDir>/__mocks__/styleMock.js'
  },
  setupFilesAfterEnv: ['<rootDir>/__tests__/.setup.ts'],
  testMatch: ['**/?(*.)+(spec|test)?(s).+(ts|tsx)']
};
