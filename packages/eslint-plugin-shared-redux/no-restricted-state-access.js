function isUseSelector(node) {
  return node.callee.name === "useSelector";
}

function isFunctionExpression(node) {
  return (
    node.type === "ArrowFunctionExpression" ||
    node.type === "FunctionExpression"
  );
}

function isArrowFunctionExpression(node) {
  return node.type === "ArrowFunctionExpression";
}

function reportNoRestrictedState(context, node, stateName) {
  context.report({
    message: `App should not access Redux state of other apps. Trying to access "${stateName}"`,
    node,
  });
}

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: "problem",
    docs: {
      description: "do not access",
    },
  },
  create(context) {
    const config = context.options[0] || {};
    const allowedReduxStates = config.allowedReduxStates || [];
    if (config.appState) allowedReduxStates.push(config.appState);

    return {
      CallExpression(node) {
        if (!isUseSelector(node)) return;
        const functionExpression = node.arguments && node.arguments[0];
        if (functionExpression && isFunctionExpression(functionExpression)) {
          if (isArrowFunctionExpression) {
            let functionBody = functionExpression.body;

            while (
              functionBody.type === "MemberExpression" &&
              functionBody.object?.type === "MemberExpression"
            ) {
              functionBody = functionBody.object;
            }

            const returnedValue = functionBody.property;
            if (!allowedReduxStates.includes(returnedValue.name)) {
              reportNoRestrictedState(context, node, returnedValue.name);
            }
          }
        }
      },
    };
  },
};
