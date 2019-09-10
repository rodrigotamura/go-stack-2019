# Introduction

You can see more details [here](./1562597351733.pdf). Bellow we going to note some details in a nutshell.

Flux is an architeture implemented by lib called **Redux** working with ReactJS and React Native, Angular or any front-end JS projects.

Flux is a manner of communication among elements in a display, and controlling of global states. Global States does not have an owner.

When we have a state or data which do not have a unique owner and it is handled by many components it is indicated to use Flux architeture.

### Principles to use Redux

- Every action must have a **type** (unique type name) for each action which we want to manipulate the state;
- The state must be in Redux, we can not store half of an state in Redux and another part of this state in component;
- We must not mutate a state of Redux without an action (like a component state);
- Action and reducer must not make any side-effect assyncronous works (API requests, call a DB). It is a concept of a **pure function** which we can call it and always it will returns the same results;
- Any syncronous logics and business rules must be in a reducer and NEVER in an action;
- **Not every application needs Redux, start without it and feel the necessity to implement it after.**.

# About the project

In order to implement Flux Architeture, we will develop a sample of an e-commerce using ReactJS and Redux and approach the most important datails of this architeture and lib.

The project can be accessed in [here](./project/), however in this README we going to note the details the implementations.

### Don't you remember how to create a new ReactJS project?

`$ yarn create react-app project`

And afterwards configure ESlint, Prettier, EditoConfig. Don't you remember? No prob, [click here](https://github.com/rodrigotamura/go-stack-2019/tree/master/module03/react-first-project#eslint-prettier-and-editorconfig).

# Special details about routes

Basically we import **BrowserRoute** to use inside at routes.js. We will import it inside [App.js](./project/src/App.js), and implement `<BrowserRouter>` there instead at router.js.

Btu why are we including at [App.js](./project/src/App.js)? Because we want to have a default HEADER that will be used in whole project. Within HEADER we will implement cart feature and navigation. Important is that HEADER must be a child of <BrowserRoute>:

```javascript
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes />
    </BrowserRouter>
  );
}
```

# Polished

Polished is a library that deal with colors in JS. It could lighten or darken a color, add opcity, and so on.

We want to darken a button whem is is hover ([see here an example](./src/components/Home/styles.js)).

# API with JSON Server

We will consume one API in order to populate our shoes object using [JSON Server](https://github.com/typicode/json-server) that is a full fake REST API with zero coding in less than 30 seconds (seriously). Created with <3 for front-end developers who need a quick back-end for prototyping and mocking.

`$ yarn global add json-server`

We will create the file [server.json](./project/server.json). It provides two routes: stock and products.

Run `$ json-server server.json -p 3333 -w`
(`-w` flag is live reload, if we change server.json)

Noew we have a fake API using JSON Server accessing `http://localhost:3333/`.

And we will user Axios for API sonsuming [/src/services/api.js](./project/src/services/api.js)

# Internationalization (i18n)

Working with listing of products, we can realize that the price is not formatted.

Let's format it based on the locale setted in our project.

Create [/src/util/format.js](./project/src/util/format.js) and it will contain the format functions.

(Note that **/src/utils/** we will store every function that is usefu for all application).

And we will use at [Home Page](./projects/src/pages/Home/index.js).

# Configuring Redux

Let's install a package that will integrate Redux with React: `$ yarn add redux react-redux`.

Create:

- /src/store -> this folder will stores every Redux files;
- [/src/store/index.js](./project/src/store/index.js) -> Initial config for Redux. Open this file for further details.

Import **react-redux** within [App.js](./project/src/App.js).

**If you see an error** it means that you need to create a new Reducer function at [/src/store/index.js](./project/src/store/index.js). In this project we will create `cart()` reducer where the state will be an empty array.

Let's create some others folders and file:

- /src/store/modules/ -> we can create many modules, or many type of data we can store in Redux.
- [/src/store/modules/cart/reducer.js] -> we will create `cart` reducer.

NOTE: FOR ORGANIZATION we will not create the reducers directly in [/src/store/index.js](./project/src/store/index.js), we will separate in differents modules at /src/store/modules/\* and import them there.

We can create a reducer for cart, reducer for users' information, reducer for anything.

However if we want to create another reducers, we need firstly create [/src/src/store/modules/rootReducer.js](./project/src/src/store/modules/rootReducer.js). Open this file in order to understand how would we include more than one reducers.

`CombineReducers` will combine many reducers at once.

Finally we import `rootReducer.js` into [/src/store/index.js](./project/src/store/index.js)
