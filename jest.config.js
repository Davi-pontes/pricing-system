module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
      '^.+\\.ts?$': 'ts-jest',
      '^.+\\.[tj]sx?$': 'babel-jest', // Para transformar tanto arquivos TypeScript quanto JavaScript com babel
    },
    moduleNameMapper: {
      "^@/(.*)$": "<rootDir>/src/$1" // Mapeamento de aliases
    }
  };
  