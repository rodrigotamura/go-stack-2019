# Configure Webpack, Babel, and another initial configs again?!

It is not necessary anymore to create a new project of ReactJS manually as we have done before [here](../react/).

We can generate a boilerplate of a ReactJS project just running the folllow command:

`$ yarn create react-app <project-name>`

If you open [package.json](./package.json) you might see `dependencies -> react-scripts`. Inside this package we have stored out environment packages, like Webpack, Babel, and so on.

We going to exclude `eslint` configuration from `package.json` because we will configure ESLint from ZERO.

```json
"eslintConfig": {
  "extends": "react-app"
},
```

We need now remove some not important files and scripts from the project because we will not use them now:

- All comments, manifest, logo from [/public/index.html](./public/index.html).
- Remove `./src/App.css|index.css|App.test.js|logo.svg|serviceWorker.js`
- In [/src/index.js](./src/index.js) remove lines that corresponds to serviceWorker.
