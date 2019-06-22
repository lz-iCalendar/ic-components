module.exports = {
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  },
  env: {
    browser: true,
    es6: true
  },
  plugins: ["react", "import", "jsx-a11y"],
  extends: ["eslint:recommended", "plugin:react/recommended"],
  rules: {
    semi: [2, "always"],
    indent: [2, 2],
    "max-len": [2, 120],
    "array-bracket-spacing": 2,
    "object-curly-spacing": [2, "always"],
    "object-shorthand": 2,
    "comma-dangle": [2, "always-multiline"],
    "comma-spacing": 2,
    "eol-last": 2,
    "quote-props": [2, "as-needed"],
    quotes: [2, "single"],
    "no-console": 1,
    "no-redeclare": 2,
    "no-dupe-keys": 2,
    "no-extra-semi": 2,
    "no-undef": 2,
    "no-unused-vars": 2,
    "no-use-before-define": 2,
    "no-const-assign": 2,
    "no-dupe-class-members": 2,
    "no-shadow": 2,
    "no-param-reassign": 2,
    "react/prop-types": 0,
    "react/jsx-no-target-blank": 0
  }
};
