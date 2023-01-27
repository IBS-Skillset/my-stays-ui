module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./src/jest.setup.ts'],
  snapshotResolver: './src/jest.custom-resolver.ts',
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': '<rootDir>/src/mocks/styleMock.ts',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/src/mocks/fileMock.ts',
  },
  testPathIgnorePatterns: [
    'mocks',
    '<rootDir>/src/store/stateStorage.ts',
    '<rootDir>/src/store/selectors/Selectors.ts',
  ],
  coveragePathIgnorePatterns: [
    'mocks',
    '<rootDir>/src/store/stateStorage.ts',
    '<rootDir>/src/store/selectors/Selectors.ts',
  ],
}
