import * as radix from "@radix-ui/colors";

function createSystemColor(key: string, color: string) {
  return Array.from({ length: 12 })
    .map((_, index) => index + 1)
    .reduce(
      (acc, scale) => ({
        ...acc,
        [`${key}${scale}`]: radix[color][`${color.replace("Dark", "")}${scale}`],
      }),
      {}
    );
}

type ThemeColors = {
  white: string;
  black: string;

  neutral1: string;
  neutral2: string;
  neutral3: string;
  neutral4: string;
  neutral5: string;
  neutral6: string;
  neutral7: string;
  neutral8: string;
  neutral9: string;

  neutralA1: string;
  neutralA2: string;
  neutralA3: string;
  neutralA4: string;
  neutralA5: string;
  neutralA6: string;
  neutralA7: string;
  neutralA8: string;
  neutralA9: string;

  primary1: string;
  primary2: string;
  primary3: string;
  primary4: string;
  primary5: string;
  primary6: string;
  primary7: string;
  primary8: string;
  primary9: string;

  positive1: string;
  positive2: string;
  positive3: string;
  positive4: string;
  positive5: string;
  positive6: string;
  positive7: string;
  positive8: string;
  positive9: string;

  warning1: string;
  warning2: string;
  warning3: string;
  warning4: string;
  warning5: string;
  warning6: string;
  warning7: string;
  warning8: string;
  warning9: string;

  critical1: string;
  critical2: string;
  critical3: string;
  critical4: string;
  critical5: string;
  critical6: string;
  critical7: string;
  critical8: string;
  critical9: string;

  gold1: string;
  gold2: string;
  gold3: string;
  gold4: string;
  gold5: string;
  gold6: string;
  gold7: string;
  gold8: string;
  gold9: string;

  silver1: string;
  silver2: string;
  silver3: string;
  silver4: string;
  silver5: string;
  silver6: string;
  silver7: string;
  silver8: string;
  silver9: string;

  bronze1: string;
  bronze2: string;
  bronze3: string;
  bronze4: string;
  bronze5: string;
  bronze6: string;
  bronze7: string;
  bronze8: string;
  bronze9: string;
};

function createSystemColors(colors): ThemeColors {
  return {
    ...Object.keys(colors).reduce(
      (acc, key) => ({ ...acc, ...createSystemColor(key, colors[key]) }),
      {}
    ),
    ...createSystemColor("neutralA", `${colors.neutral}A`),
    white: "#FFFFFF",
    black: "#000000",
  };
}

export const themeColors = createSystemColors({
  neutral: "slateDark",
  primary: "violetDark",
  positive: "greenDarkA",
  critical: "redDarkA",
  warning: "amberDarkA",
});

console.log(themeColors);
