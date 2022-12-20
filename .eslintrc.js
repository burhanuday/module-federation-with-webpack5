module.exports = {
  root: true,
  extends: ["plugin:shared-redux/recommended"],
  rules: {
    "shared-redux/no-restricted-state-access": [
      "error",
      {
        allowedReduxStates: ["host"],
        appState: "remote",
      },
    ],
  },
};
