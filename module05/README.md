# React Hooks

In this approach, we will see about the concepts and basic usage of **React Hooks**

![react hooks|783x391,20%](hooks.png)

### Preparing our develop environment for React Hooks usage

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

You can see implementations and some important explanations at [/src/App_useState.js](./src/App_useState.js).

The older approach we had one big state storing every information from that component. Now we have **one state (or useState) for each information**.

# Hook useEffect()

It only overlaps the life cycle we had traditionally (componentDidMount, componentDidUpdate, etc.).

You can see implementations and some important explanations at [/src/App_useEffect.js](./src/App_useEffect.js).

We conclude that React Hooks useEffect() replaces the traditional methods of life cycle from component reducing verbosity.

# Hook useMemo()

In our example we are developing, supose that we want to display the number of techs added by user:

```html
<strong>You have {tech.length} techs.</strong>
```

However, as simple as this code is, but imagine if this code snippet is a very complex code with many complex calculations, every time we add a new tech or make some change on any state this component will render again and this code snippet will be executed as well. It will impair the app's performance.

So, **useMemo()** will deal with complex codes without our component execute it again. It will execute once and it could store the result of this code in a state variable, in order to not execute every time the component is rendered.

The scenario is, every time we CHANGE `tech` variable, we store in `techSize` its length.

```javascript
const techSize = useMemo(() => tech.length, [tech]);
```

About useMemo() usage:

- First parameter: function which returns the desired value into `techSize`;
- Second parameter: which state variables are listen to. When one of these listed variables is changed, the function on first parameter will be executed.

You can see implementations and some important explanations at [/src/App_useMemo.js](./src/App_useMemo.js).

# Hook useCallback()

Similar to `useMemo()`, instead return primitive data type (bool, string, number, and so on.), `useCallback()` returns a function.

Look at function `handleAdd()`, within function `App()`. Every time we change **ANY STATE VARIABLE** (e.g. `newTech` (by pressing a key) or add/remove a value to `tech`), `handleAdd()` is rendered again (from ZERO!). And this is not a good manner for our app's performance.

So, `useCallback()` will solve this problem for us! 😄

You can see implementations and some important explanations at [/src/App.js](./src/App.js).

Let's transform:

```javascript
function handleAdd() {
  setTech([...tech, newTech]);
  setNewTech('');
}
```

To:

```javascript
const handleAdd = useCallback(() => {
  setTech([...tech, newTech]);
  setNewTech('');
}, [newTech, tech]);
```

Now, `handleAdd` will be allocated again in memory only when `newTech` or `tech` are changed.

About useCallback():

- The first parameter will be the function itself, which is executed by `handleAdd()`;
- The second parameter will be the variables which we need to inject into the function.

👉 **IMPORTANT: We use `useCallBack()` ONLY we need to handle with states variables.**

# Implementing React Hooks in a real app

Please, you can visit this project [here](./project).

Final result of mine:

![Project Sample Final ](https://raw.githubusercontent.com/rodrigotamura/go-stack-2019/master/module04/flux/imgs/rockeshoes-demo.gif)

### Asynchronous functions with async/await

We CAN NOT use async/await directly on `useEffect()`:

👎 WRONG MANNER:

```javascript
async useEffect(() => {
  // ...
})
```

👍 CORRECT MANNER:

```javascript
useEffect(() => {
  async function functionName() {
    await ...
  }

  functionName();
})
```

### Using React Hooks with Redux

At [Header Component](./project/src/components/Header/index.js) you may see the follow code snippet:

```javascript
export default connect(state => ({
  cartSize: state.cart.length,
}))(Header);
```

We could simplify it A LOT!

Please, check differences between:

- Header Component: [older version (without Hooks)](./project/src/components/Header/index_older.js) and [latest version (with Hooks)](./project/src/components/Header/index.js);
- Home Component: [older version (without Hooks)](./project/src/pages/Home/index_older.js) and [latest version (with Hooks)](./project/src/pages/Home/index.js);
- Cart Component: [older version (without Hooks)](./project/src/pages/Cart/index_older.js) and [latest version (with Hooks)](./project/src/pages/Cart/index.js);

Then, every time we need access Redux States, we use `useSelector()`; and for Redux Dispatch, we use `useDispatch()`;
