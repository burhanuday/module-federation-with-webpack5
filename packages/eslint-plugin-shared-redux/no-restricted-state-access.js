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

function isObjectDestructuring(node) {
  return node?.type === "ObjectPattern";
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
          if (isArrowFunctionExpression(functionExpression)) {
            let functionBody = functionExpression.body;

            // check for params destructuring
            if (isObjectDestructuring(functionExpression.params?.[0])) {
              // handle the destructuring case
              const destructuredObject = functionExpression.params[0];
              const keys = destructuredObject?.properties;
              if (keys) {
                for (const property of keys) {
                  if (!allowedReduxStates.includes(property?.key?.name)) {
                    reportNoRestrictedState(context, node, property?.key?.name);
                  }
                }
              }
            } else {
              // handle non destructuring case
              while (
                functionBody.type === "MemberExpression" &&
                functionBody.object?.type === "MemberExpression"
              ) {
                functionBody = functionBody.object;
              }

              const returnedValue = functionBody?.property;
              if (
                returnedValue?.name &&
                !allowedReduxStates.includes(returnedValue?.name)
              ) {
                reportNoRestrictedState(context, node, returnedValue.name);
              }
            }
          } else {
            const blockStatement = functionExpression.body;

            const returnStatement = blockStatement?.body?.find(
              (item) => item.type === "ReturnStatement"
            );

            let memberExpression = returnStatement.argument;

            while (
              memberExpression.type === "MemberExpression" &&
              memberExpression.object?.type === "MemberExpression"
            ) {
              memberExpression = memberExpression.object;
            }

            const identifier = memberExpression.property;
            if (
              identifier?.name &&
              !allowedReduxStates.includes(identifier?.name)
            ) {
              reportNoRestrictedState(context, node, identifier.name);
            }
          }
        }
      },
    };
  },
};
