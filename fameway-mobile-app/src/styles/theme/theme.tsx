import React, { useContext } from 'react';

import {
  fonts,
  FontsTypes,
  colors,
  metrics,
  MetricsTypes,
  ColorTypes,
} from '.';

export type ThemeType = {
  colors: ColorTypes;
  fonts: FontsTypes;
  metrics: MetricsTypes;
};

export const defaultTheme:ThemeType = {
  colors,
  fonts,
  metrics,
};

interface ThemeListTypes {
  light: ThemeType
  dark: ThemeType
}
export const ThemeList:ThemeListTypes = {
  light: {
    ...defaultTheme,
  },
  dark: {
    ...defaultTheme,
  },
};

export interface ThemeContextProps {
  theme: ThemeType;
  setTheme: (theme:ThemeType) => void;
}

export const ThemeContext = React.createContext({
  theme: ThemeList.light,
  setTheme: () => {},
} as ThemeContextProps);

export const useTheme = () => useContext(ThemeContext)?.theme;
export const useSetTheme = () => useContext(ThemeContext)?.setTheme;
