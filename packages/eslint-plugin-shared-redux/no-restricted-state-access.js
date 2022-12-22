function isUseSelector(node) {
  return node.callee.name === "useSelector";
}

function isFunctionExpression(node) {
  return (
    node?.type === "ArrowFunctionExpression" ||
    node?.type === "FunctionExpression"
  );
}

function isArrowFunctionExpression(node) {
  return node?.type === "ArrowFunctionExpression";
}

function isObjectDestructuring(node) {
  return node?.type === "ObjectPattern";
}

function isObjectExpression(node) {
  return node?.type === "ObjectExpression";
}

function reportNoRestrictedState(context, node, stateName) {
  context.report({
    message: `App should not access Redux state of other apps. Trying to access "${stateName}"`,
    node,
  });
}

function getAllowedReduxStates(context) {
  const config = context.options[0] || {};
  const allowedReduxStates = config.allowedReduxStates || [];
  if (config.appState) allowedReduxStates.push(config.appState);
}

function validateDestructuredParams(context, destructuredObject) {
  const allowedReduxStates = getAllowedReduxStates(context);
  const keys = destructuredObject?.properties;
  if (keys) {
    for (const property of keys) {
      if (!allowedReduxStates.includes(property?.key?.name)) {
        reportNoRestrictedState(context, property, property?.key?.name);
      }
    }
  }
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
    const allowedReduxStates = getAllowedReduxStates(context);

    return {
      CallExpression(node) {
        if (!isUseSelector(node)) return;
        const functionExpression = node.arguments && node.arguments[0];
        if (functionExpression && isFunctionExpression(functionExpression)) {
          if (isObjectDestructuring(functionExpression.params?.[0])) {
            // handle the destructuring case with multiple keys
            const destructuredObject = functionExpression.params[0];
            validateDestructuredParams(context, destructuredObject);
            return;
          }

          // handle non destructuring case
          let functionBody;

          if (isArrowFunctionExpression(functionExpression)) {
            // find the return value of arrow function
            functionBody = functionExpression.body;
          } else {
            // find the return statement in case of normal function
            functionBody = functionExpression.body;
            const returnStatement = functionBody?.body?.find(
              (item) => item.type === "ReturnStatement"
            );

            functionBody = returnStatement.argument;
          }

          while (
            functionBody.type === "MemberExpression" &&
            functionBody.object?.type === "MemberExpression"
          ) {
            functionBody = functionBody.object;
          }

          const returnedValue = functionBody?.property;
          // check if accessing state is allowed
          if (
            returnedValue?.name &&
            !allowedReduxStates.includes(returnedValue?.name)
          ) {
            reportNoRestrictedState(context, returnedValue, returnedValue.name);
          }
        }
      },
      VariableDeclarator(node) {
        if (node.id?.name !== "mapStateToProps") return;

        if (!isFunctionExpression(node.init)) return;

        const functionExpression = node.init;
        const functionParams = functionExpression.params;
        const firstParam = functionParams[0];

        if (isObjectDestructuring(firstParam)) {
          // handle destructuring case
          const destructuredObject = firstParam;
          validateDestructuredParams(context, destructuredObject);
          return;
        }

        // handle if body is just an object getting returned
        if (isObjectExpression(functionExpression.body)) {
          // handle destructuring case
          const destructuredObject = functionExpression.body;
          const properties = destructuredObject?.properties;

          for (const property of properties) {
            let propertyValue = property.value;
            while (
              propertyValue.type === "MemberExpression" &&
              propertyValue.object?.type === "MemberExpression"
            ) {
              propertyValue = propertyValue.object;
            }

            const returnedValue = propertyValue?.property;

            if (
              returnedValue?.name &&
              !allowedReduxStates.includes(returnedValue?.name)
            ) {
              reportNoRestrictedState(
                context,
                returnedValue,
                returnedValue.name
              );
            }
          }

          return;
        }

        // handle block statement with return statement
        let returnStatement = functionExpression.body;
        returnStatement = returnStatement?.body?.find(
          (item) => item.type === "ReturnStatement"
        );

        let returnArgument = returnStatement.argument;

        while (
          returnArgument.type === "MemberExpression" &&
          returnArgument.object?.type === "MemberExpression"
        ) {
          returnArgument = returnArgument.object;
        }

        const returnedValue = returnArgument?.property;
        // check if accessing state is allowed
        if (
          returnedValue?.name &&
          !allowedReduxStates.includes(returnedValue?.name)
        ) {
          reportNoRestrictedState(context, returnedValue, returnedValue.name);
        }
      },
    };
  },
};
