module.exports = {
  setupFilesAfterEnv: ["./src/setupTests.js"],
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^remote1": "<rootDir>/../remote1/src/Button.tsx",
  },
};
