# Introduction

I suggest you to check out [here](./slides/intro.pdf) for a full introduction, that it will talk about:

- Explaining about React, RectJS and React Native;
- About Webpack (bundle builder, importing CSS, images, etc. live reload with Webpack Dev Server) / Babel (make old browsers to understand syntax of modern JS);
- Imperative programming vs. Declarative programming;

# Preparing environment

Let's initialize our project with `$ yarn init -y` and install follow packages:

```
$ yarn add @babel/core @babel/preset-env @babel/preset-react webpack webpack-cli -D
$ yarn add react react-dom
$ yarn add babel-loader -D
```

## Configuring Webpack and Babel

1. Let's create and configure [babel.config.js](./babel.config.js);

2. Let's create and configure [webpack.config.js](./webpack.config.js);
   2.1 Let's create ./src folder in order to store all JS code. Within this folder we will create [/src/index.js](./src/index.js).

3. Open [package.json](./package.json) and add new script:

```json
"scripts": {
  "build": "webpack --mode development"
}
```

4. For testing, add some modern JS in [/src/index.js](./src/index.js).

5. In terminal type `$ yarn build`. You will see that [/public/bundle.js](./public/bundle.js) is created. And at the ending of this file you will see our modern JS in ./src/index.js converted into old JS.

## Configuring Webpack for live reload

First install `$ yarn add webpack-dev-server -D` and open [webpack.config.js](./webpack.config.js) and add _devServer_ property.

Afterwards, open [package.json](./package.json) and add _dev_ in scripts: `webpack-dev-server --mode development`

When we declare **--mode development** we will build our bundle without minifying. Wether we change to **--mode production** our bundle will be builded minifyied.

# Creating root component with React

We need to create [/public/index.html](./public/index.html).

Please check out at [/src/index.js](./src/index.js) for details and instructions.

**It is a good practice** to separate our root component from another components:

1. Create [/src/App.js](./src/App.js) and create root component there.
2. Import this file into [/src/index.js](./src/index.js)

# Importing CSS

In order to import CSS in our component, we need install 2 loaders:
`$ yarn add style-loader css-loader -D`

Let's add some module/rules in [webpack.config.js](./webpack.config.js) (open this file for further importants explanations) for CSS processing.

# Importing images

In order to import images in our component, we need install follow loader:
`$ yarn add file-loader -D`

Let's add some module/rules in [webpack.config.js](./webpack.config.js) (open this file for further importants explanations) for files processing.

Let's create `/src/assets/` folder and store one image, and import this image in [/src/App.js](./src/App.js) (the name is _profile_).

# Class components

Firstly let's separate our root component (App.js) from the rest of another components creating the folder `/src/components/`.

Inside this folder, let's create [/src/components/TechList.js](./src/components/TechList.js), this is our new component.

In _TechList_ component, we will talk about the ways to create a component: Function Component and Class Component. the most used is **Class Component**.
(with Class Component we can use **state variables**, that are not same of traditional variables).

```javascript
class TechList extends Component {
  // we can create special variables called state
  state = {
    techs: ["Node.js", "ReactJS", "React Native"]
  };
  [... `rest of code`]
}
```

If we run our server we will get an error, because Babel cannot understand this manner to declare variables in a class (if we declare in a constructor method it would work).

To fix it we need to install `$ yarn add @babel/plugin-proposal-class-properties -D`, and we need to add it as a plugin into [/babel.config.js](./babel.config.js).

Ok, let's attach our new component into root component [App.js](./src/App.js).

# State and Immutability

Still working in [/src/components/TechList.js](./src/components/TechList.js), you will realize that we are using our state variable called _techs_ to iterate in render() method.

We can execute pure JS scripts inside the reutning of render() within curling braces `{ JS scripts here }`, such as variables and so on.

Returning to talk about our techs iteration, each item will require a **key** param, that receive a unique value for each iteration. It will help React to index the listing and apply changes fastly, like using INDEX in a table`s DB.

**When we return more than one element in our render method** it's obliged to have a container. Generally a `<div>` will make this role.

```html
<div>
  <p>First element</p>
  <h1>Second element</h1>
</div>
```

However, we can replace this `<div>` that is working as a container with a **fragment tag** - empty tags - that will not be rendered:

```html
<>
  <p>First element</p>
  <h1>Second element</h1>
</>
```

### New method in a component

If we need to create a new method inside the component, it's necessary to create using **arrow function** approach. because, if we use the traditional function:

```javascript
function method() {}
```

we cannot have access of another properties or functions out of its scope (like `this.state.newTech` for example).

### Changing a value of a state's variable:

If we simply declare this.state.newTech = e,target.value It will not work, because React has a concept called IMMUTABILITY inside our state. This state is immutable, can not be mutted.

If we need to create or change a state (or add an item into an array), the Component class offers a functions that is called **setState()**.

### Removing value from state's array

Look at the code bellow:

```javascript
<ul>
  {this.state.techs.map(tech => (
    <li key={tech}>
      {tech}
      <button onClick={() => handleDelete(tech)} type="button">
        Remover
      </button>
    </li>
  ))}
</ul>
```

As you can see, we are creating a button, that will call `handleDelete()` in order to delete the indicated item.

It's very strange to declare an arrow function, but this is very necessary because if we declare:

```javasript
<button onClick={handleDelete(tech)} type="button">
```

and execute in browser, `handleDelete(tech)` will be executed automatically. So, that's why we are using with arrow function.

Another thing is that we cannot remove an item from state's array using `Array.splice()` method, remembering that in React we are dealing with immutability. Plase, check `handleDelete()` method and see how we remove an item from array in a state.
