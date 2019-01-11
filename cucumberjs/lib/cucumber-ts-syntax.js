function TypeScriptSnippetSyntax(snippetInterface) {
  this.snippetInterface = snippetInterface;
}

TypeScriptSnippetSyntax.prototype.build = function ({
                                                      comment,
                                                      generatedExpressions,
                                                      functionName,
                                                      stepParameterNames
                                                    }) {
  let functionKeyword = '';
  const functionInterfaceKeywords = {
    'generator': `${functionKeyword}*`,
    'async-await': `async ${functionKeyword}`,
    'promise': `async `
  };

  if (this.snippetInterface) {
    functionKeyword = `${functionKeyword}${functionInterfaceKeywords[this.snippetInterface]}`;
  }

  let implementation = `return 'pending';`;

  const definitionChoices = generatedExpressions.map((generatedExpression, index) => {
    const prefix = index === 0 ? '' : '// ';

    const allParameterNames = generatedExpression.parameterNames
        .map(parameterName => `${parameterName}: any`)
        .concat(stepParameterNames.map(stepParameterName => `${stepParameterName}: any`));

    return (
        `${prefix}${functionName}(\'` +
        generatedExpression.source.replace(/'/g, '\\\'') +
        '\', ' +
        functionKeyword +
        '(' +
        allParameterNames.join(', ') +
        ') => {\n'
    );
  });

  return definitionChoices.join('') + `  // ${comment}\n  ${implementation}\n});`;
};

module.exports = TypeScriptSnippetSyntax;