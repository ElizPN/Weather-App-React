import type { Config } from "@jest/types";

const esModules = ["lodash-es", "nanoid"].join("|");

const config: Config.InitialOptions = {
  roots: ["<rootDir>/src"],
  preset: "ts-jest",
  globals: {
    "ts-jest": {
      diagnostics: true,
    },
  },
  coveragePathIgnorePatterns: ["./src/*/*.types.{ts,tsx}"],
  coverageReporters: ["json", "lcov", "text-summary", "clover"],
  coverageThreshold: {
    global: {
      statements: 95,
      branches: 95,
      lines: 95,
      functions: 95,
    },
  },
  testMatch: ["<rootDir>/src/**/*.test.{js,jsx,ts,tsx}"],
  automock: false,
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "ts-jest",
    "^.+\\.tsx?$": "<rootDir>/node_modules/ts-jest/preprocessor.js",
    "^.+\\.svg$": "<rootDir>/svgTransform.js",
  },
  modulePaths: [],
  moduleNameMapper: {
    "^react-native$": "react-native-web",
    "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",
    "src/(.*)$": "<rootDir>/src/$1",
    "^lodash-es(/(.*)|$)": "lodash$1",
    "^nanoid(/(.*)|$)": "nanoid$1",
    "\\.(css|less)$": "<rootDir>/styleMock.js",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  transformIgnorePatterns: [`/node_modules/(?!${esModules})`],
  testEnvironment: "jsdom",
};

export default config;
