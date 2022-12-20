module.exports = {
  root: true,
  extends: ["plugin:shared-redux/recommended"],
  rules: {
    "shared-redux/no-restricted-state": [
      "error",
      {
        allowedReduxStates: ["host"],
        appState: "remote",
      },
    ],
  },
};
