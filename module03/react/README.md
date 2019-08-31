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
