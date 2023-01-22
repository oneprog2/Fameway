import { useMemo } from 'react';

/**
 * Hook to memoize dynamic style.
 * @param getStyles Function takes a context (props) and returns style memoized
 */

export const createUseStyles = <TContext, TStyles>(
  getStyles: (context: TContext) => TStyles
): ((context: TContext) => TStyles) => {
  return (context) => {
    return useMemo(() => getStyles(context), [context]);
  };
};
