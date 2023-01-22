# Illiasse's Boilerplate

React Native boilerplate to start a new mobile application project.

This provides a good architecture for building cross-platform mobile apps and all the usual tools / libs frequently used.

Lib installed       | Benefits
---------------     | ---------------
  typescript        | Code strengh
  react-navigation  | Navigation
  eslint            | Code quality
  prettier          | Code quality
  husky             | Code quality
  commitlint        | Team working
  i18n              | Multi-language
  detox             | Testing

This project had also some tools to help developping faster 🚀.

- Aliases (@components, @pages, @navigation, @styles, @utils, @assets, @constants)
- All the components, pages etc. are indexed (you can import them like : `import { Button } from "@components"`)
- Hooks for all the styles metrics, colors, fonts
- You can use snippets to create components and pages

### How to clone

```sh
git clone https://github.com/oneprog2/boilerplate-rn.git
```

### Install dependencies

```sh
yarn install
```

#### Start the project

- Start expo: `yarn start`
- Start iOS: `yarn ios`
- Start android: `yarn android`