import React from 'react';

export const createUseStyles = <TContext, TStyles>(
  getStyles: (context: TContext) => TStyles,
): ((context: TContext) => TStyles) => {
  return context => {
    return React.useMemo(() => getStyles(context), [context]);
  };
};
