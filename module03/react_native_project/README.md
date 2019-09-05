# Introduction

If you prefer, you can read some introductory concepts [right here](./1562003727785.pdf).

# Preparing our development environment

Please, you can check out how to prepare the development environment [here](https://docs.rocketseat.dev/).

# Creating project

There are many ways to install a React Native project, however we will use **react-native-community/cli**:

`$ yarn add project_name` or `$ npx react-native init project_name` (if you do not want to install react-native-cli globally).

### Initializing app

After created the project, with your emulator or device connected by USB, you can run `react-native run-android`.

# ESLint, Prettier and EditorConfig

### EditorConfig

Please, [check out here](https://github.com/rodrigotamura/go-stack-2019/tree/master/module03/react-first-project#editorconfig).

### ESLint

**Normally .eslintrc.js is already created within RN (REact Native) project.**

### ESLint

It's very important to standardize our code in order to not mess it up and harm the future maintenances.

That's why we will implement an auto standardize in our project's code whit **eslint**:

```
$ yarn add eslint -D
```

List is a feature that check our code and fix everything out of standard automatically.

With the follow command ESlint will check our code for standardize mistakes:

```
$ yarn eslint --init
```

And we will select the follow options:

1. To check syntax, find problems, and enforce code style
2. Javascript modules (import/export)
3. React
4. Uncheck _Browser_ and _Node_
5. Use a popular style guide
6. Airbnb
7. Javascript
8. Confirm the installation

After installation you can remove `package-lock.json` from root of project, because we are using Yarn. And run `$ yarn` in order to update our dependencies into _yarn.lock_.

### Prettier

It will bealty our code automatically.

```
$ yarn add prettier eslint-config-prettier eslint-plugin-prettier babel-eslint -D
```

_eslint-config-prettier_ and _eslint-plugin-prettier_ are packages that will integrate ESlint with Prettier. With _babel-eslint_ we are saying to ESLint that we are using the latest versions of Babel and latest functionalities of ESLint.

Now let's open _.eslintrc.js_ and change or add the follow metadatas:

```
extends: ['airbnb-base', 'prettier', 'prettier/react'],
parser: "babel-eslint", // this is before parserOptions
plugins: ["react", "prettier"],
rules: {
  "prettier/prettier": "error",
  "react/jsx-filename-extension": ["warn", { extensions: [".jsx", ".js"] }],
  "import/prefer-default-export": "off"
},
```

By default, AirBNB standardize will require to use **JSX** file extension if we want code a React file. Note that `react/jsx/filename-extension` is setting a rule that ESLint will not throw any error if we use **.js** files for React codes instead JSX extension.

`"import/prefer-default-export": "off"` we are disabling a rule that oblige us export as default, because in our project we will have exports that are not default.

If you test saving some JS file from your project, you will realize that everything that use double quotes ('), that is a patter we will adopt (AirBNB), will be changed to single quotes ('), because within _extends_ from _.eslintrc.js_ there is a conflict between _airbnb-base_ and _prettier_.

To fix it we will create another file in our root called **.prettierrc** to adopt only single quotes. Implement the follow content:

**.prettierrc is already created on creating RN project, but named as _.prettierrc.js_**

```
module.exports = {
  singleQuote: true,
  trailingComma: 'es5',
};
```

### Re-run again React Native project

For all this implementation it is important to restart the RN project in your emulator or device:

`$ react-native start --reset-cache`
(_Note: in many cases of issues caused by something are solved running wether command above or `$ react-native run-android`_).
