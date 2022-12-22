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
  return allowedReduxStates;
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

function getReturnStatementFromCodeBlock(node) {
  const statements = node.body;
  const returnStatement = statements?.body?.find(
    (item) => item.type === "ReturnStatement"
  );

  return returnStatement?.argument;
}

function validateReturnStatement(context, node) {
  const allowedReduxStates = getAllowedReduxStates(context);
  while (
    node.type === "MemberExpression" &&
    node.object?.type === "MemberExpression"
  ) {
    node = node.object;
  }

  const returnedValue = node?.property;
  // check if accessing state is allowed
  if (
    returnedValue?.name &&
    !allowedReduxStates.includes(returnedValue?.name)
  ) {
    reportNoRestrictedState(context, returnedValue, returnedValue.name);
  }
}

function findAndValidateReturnValue(context, node) {
  if (node.type === "ObjectExpression") {
    const properties = node.properties;
    if (properties) {
      for (const property of properties) {
        const propertyValue = property.value;
        validateReturnStatement(context, propertyValue);
      }
    }
  }

  validateReturnStatement(context, node);
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
    return {
      CallExpression(node) {
        if (!isUseSelector(node)) return;
        const functionExpression = node.arguments && node.arguments[0];
        if (!isFunctionExpression(functionExpression)) return;

        if (isObjectDestructuring(functionExpression.params?.[0])) {
          // handle the destructuring case with multiple keys
          const destructuredObject = functionExpression.params[0];
          validateDestructuredParams(context, destructuredObject);
          return;
        }

        // handle non destructuring case
        let functionBody = functionExpression.body;

        if (!isArrowFunctionExpression(functionExpression)) {
          functionBody = getReturnStatementFromCodeBlock(functionExpression);
        }

        findAndValidateReturnValue(context, functionBody);
      },
      VariableDeclarator(node) {
        if (node.id?.name !== "mapStateToProps") return;

        if (!isFunctionExpression(node.init)) return;

        const functionExpression = node.init;

        if (isObjectDestructuring(functionExpression.params?.[0])) {
          // handle destructuring case
          const destructuredObject = functionExpression.params[0];
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
            findAndValidateReturnValue(context, propertyValue);
          }
          return;
        }

        // handle block statement with return statement
        const returnArgument =
          getReturnStatementFromCodeBlock(functionExpression);
        findAndValidateReturnValue(context, returnArgument);
      },
    };
  },
};
