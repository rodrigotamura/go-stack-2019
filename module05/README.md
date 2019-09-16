# React Hooks

Please, set the basic configuration, such as ESlint, Prettier, EditorConfig and so on ([check it out here](https://github.com/rodrigotamura/go-stack-2019/tree/master/module03/react-first-project#eslint-prettier-and-editorconfig)).

The extra configuration we will install an config a plugin for ESLint which deals with React Hooks that warns us of any incorrect usage.

`$ yarn add eslint-plugin-react-hooks -D`

Open [.eslintrc.js](./.eslintrc.js) and add the follow line:

```javascript
plugins: [
  // ...
  'react-hooks',
],
rules: {
  // ...
  'react-hooks/rules-of-hooks': 'error',
  'react-hooks/exhaustive-deps': 'warn' // warns wether problem with dependencies
}
```
