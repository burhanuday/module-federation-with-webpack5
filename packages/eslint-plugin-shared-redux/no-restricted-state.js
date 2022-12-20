function isUseSelector(node) {
  return node.callee.name === "useSelector";
}

function reportNoRestrictedState(context, node) {
  context.report({
    message: "App should not access Redux state of other apps",
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
        if (
          functionExpression &&
          (functionExpression.type === "ArrowFunctionExpression" ||
            functionExpression.type === "FunctionExpression")
        ) {
          const functionBody = functionExpression.body;
          if (functionBody && functionBody.object) {
            const returnedValue = functionBody.object.property;
            if (!allowedReduxStates.includes(returnedValue.name)) {
              reportNoRestrictedState(context, node);
            }
          }
        }
      },
    };
  },
};
