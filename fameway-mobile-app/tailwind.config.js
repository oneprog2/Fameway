/** @type {import('tailwindcss').Config} */

const radix = require("@radix-ui/colors");
const nativewind = require("nativewind/tailwind");

function variableName(value) {
  return `--ige-color-${value}`;
}

function createSystemColor(key, color) {
  return Array.from({ length: 12 })
    .map((_, index) => index + 1)
    .reduce(
      (acc, scale) => ({
        ...acc,
        [variableName(`${key}-${scale}`)]:
          radix[color][`${color.replace("Dark", "")}${scale}`],
      }),
      {}
    );
}

function createSystemColors(colors) {
  return {
    ...Object.keys(colors).reduce(
      (acc, key) => ({ ...acc, ...createSystemColor(key, colors[key]) }),
      {}
    ),
    ...createSystemColor("neutral-a", `${colors.neutral}A`),
  };
}

function variablesToTheme(variables, prefix = "--ige-color-") {
  return Object.keys(variables).reduce(
    (acc, key) => ({
      ...acc,
      [key.replace(prefix, "")]: `var(${key})`,
    }),
    {}
  );
}

function createTheme(systemColors) {
  return { ...createSystemColors(systemColors), "--rem": 16 };
}

// const lightThemeVariables = createTheme({
//   neutral: "slate",
//   primary: "violetA",
//   positive: "greenA",
//   critical: "redA",
//   warning: "amberA",
// });

const darkThemeVariables = createTheme({
  neutral: "slateDark",
  primary: "yellowA",
  positive: "grassA",
  critical: "redA",
  warning: "amberA",
});

const theme = {
  darkMode: "class",
  variables: darkThemeVariables,
  darkVariables: darkThemeVariables,
  fontFamily: {
    regular: ["Oblivian-Regular"],
    bold: ["Oblivian-Bold"],
    thin: ["Oblivian-Thin"],
    light: ["Oblivian-Light"],
    regularDM: ["DM-Regular"],
    mediumDM: ["DM-Medium"],
    boldDM: ["DM-Bold"],
    tabular: ["System"],
  },
  extend: {
    colors: {
      light: "#FFFFFF",
      dark: "#000000",
      fameway: "#ffce00",
      ...variablesToTheme(darkThemeVariables),
    },
  },
};

module.exports = {
  content: [
    "./App.tsx",
    "./tailwind.config.js",
    "./App.{js,jsx,ts,tsx}",
    "./<custom directory>/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{html,js}",
  ],
  theme,
  presets: [nativewind],
};
