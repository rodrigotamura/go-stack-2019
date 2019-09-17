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

# Hook useState()

After React 16.8 we can work with components as functions - not only as class - and work with states and method of life cycles. Throught Hooks API, which was launched after this version of ReactJS, becasu it reduces the verbosity of shared information between components and reduces the verbosity from Redux, Apollo (GraphQL) and so on.

In this approach we will meet **useState**, which will allow us to create states without class format.

You can see implementations and some important explanations at [/src/App.js](./src/App_useState.js).

The older approach we had one big state storing every information from that component. Now we have **one state (or useState) for each information**.

# Hook useEffect()

It only overlaps the life cycle we had traditionally (componentDidMount, componentDidUpdate, etc.).

You can see implementations and some important explanations at [/src/App.js](./src/App.js).

We conclude that React Hooks useEffect() replaces the traditional methods of life cycle from component reducing verbosity.
