module.exports = {
  setupFilesAfterEnv: ["./src/setupTests.js"],
  testEnvironment: "jsdom",

  // test jest where to find button
  moduleNameMapper: {
    "^remote1": "<rootDir>/../remote1/src/Button.tsx",
  },
};
