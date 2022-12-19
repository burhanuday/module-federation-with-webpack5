module.exports = {
  configs: {
    recommended: {
      parser: "@typescript-eslint/parser",
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
      env: {
        browser: true,
        es2021: true,
        node: true,
      },
      extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
      ],
      plugins: ["shared-redux", "react", "@typescript-eslint"],
      rules: {
        "shared-redux/no-restricted-state": "error",
      },
      settings: {
        react: {
          version: "detect",
        },
      },
    },
  },
  rules: {
    "no-restricted-state": require("./no-restricted-state"),
  },
};
