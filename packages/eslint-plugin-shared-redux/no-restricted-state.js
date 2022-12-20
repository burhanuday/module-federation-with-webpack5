function isUseSelector(node) {
  return node.callee.name === "useSelector";
}

function reportWrongName(context, node, functionName, matching) {
  context.report({
    message: `useSelector selector "${functionName}" does not match "${matching}".`,
    node,
  });
}

function reportNoRestrictedState(context, node) {
  context.report({
    message: "useSelector should not use shell states",
    node,
  });
}

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: "problem",
    messages: {
      avoidName: "Avoid  '{{ name }}'",
    },
  },
  create(context) {
    const config = context.options[0] || {};

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
            if (returnedValue.name === "remote") {
              reportNoRestrictedState(context, node);
            }
          }
        }
      },
    };
  },
};
