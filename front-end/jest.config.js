/** @type {import('ts-jest').JestConfigWithTsJest} **/
const path = require("path");

module.exports = {
  testEnvironment: "jsdom", // Ensure tests run in a browser-like environment
  transform: {
    "\\.[jt]sx?$": "esbuild-jest", // Use esbuild-jest for transformation
  },
};
