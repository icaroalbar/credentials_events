export default {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  moduleDirectories: ["node_modules", "src"],
  transform: {
    "^.+\\.ts$": [
      "@swc/jest",
      {
        jsc: {
          parser: {
            syntax: "typescript",
            decorators: true,
          },
          transform: {
            legacyDecorator: true,
            decoratorMetadata: true,
          },
        },
      },
    ],
  },
  testEnvironment: "node",
  testMatch: ["**/?(*.)+(spec|test).ts"],
  moduleFileExtensions: ["ts", "js", "mjs"],
  moduleNameMapper: {
    "^@infra/(.*)$": "<rootDir>/src/infra/$1",
    "^@core/(.*)$": "<rootDir>/src/core/$1"
  },
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "src/infra/database/migrations/",
    "src/infra/database/data-source.ts"
  ],
};
