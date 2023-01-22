module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo", "nativewind/babel"],
    plugins: [
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
          },
        },
      ],
    ],
  };
};
