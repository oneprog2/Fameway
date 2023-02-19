module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo", "nativewind/babel"],
    plugins: [
      ["@babel/plugin-proposal-export-namespace-from"],
      ["react-native-reanimated/plugin"],
      [
        "module-resolver",
        {
          alias: {
            "@screens": "./src/screens",
            "@constants": "./src/constants",
            "@components": "./src/components",
            "@navigation": "./src/navigation",
            "@utils": "./src/utils",
            "@assets": "./src/assets",
            "@hooks": "./src/hooks",
            "@themes": "./src/themes",
            "@styles": "./src/styles",
            "@contexts": "./src/contexts",
            "@api": "./src/api",
          },
        },
      ],
    ],
  };
};

const createExpoWebpackConfigAsync = require("@expo/webpack-config");
