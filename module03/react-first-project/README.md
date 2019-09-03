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

# ESLint, Prettier and EditorConfig

### EditorConfig

In ReactJS's project, using VScode, righ-click on project files and select **Generate .editorconfig** (.editorConfig will be created in root). Open it and change:

```
root = true

[*]
indent_style = lf // force end of line be UNIX pattern instead Windows pattern
indent_size = 2
charset = utf-8
trim_trailing_whitespace = true // change to true
insert_final_newline = true // change to true

```

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
4. Check _Browser_
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

```
{
  "singleQuote": true,
  "trailingComma": "es5"
}

```

# Routing in React

Let's configure routes in our application. I shall not explain here about SPA, but basically it is a page that we can navigate without refreshing page.

Firstly let's install `$ yarn add react-router-dom`

Afterwards we will create [/src/pages/](./src/pages) that we will store every page of our application. Inside this folder we will create:

- [/src/pages/Main/index.js](/src/pages/Main/index.js)
- [/src/pages/Repository/index.js](/src/pages/Repository/index.js)

Let's put a very basic React sript inside each one.

Now, we will create, open and edit the file [/src/routes.js](./src/routes.js) (open this file for further information).

Import routes.js into [/src/App.js](./src/App.js).

# Styled components

Let's install: `$ yarn add styled-components`. This lib will change the manner we code CSS in React and React-Native.

Traditionally we need to import a CSS file in order to style the HTML tags within Main component, right?! However when a React app starts to grow it can be a problem.

The problem is that each imported CSS will not be scoped, applying only for its imported component. (it's not like Angular, for example, where each component is able to scope its own stylization).

**One of the greatest resources** from StyledComponents is that we can scope CSS stylization for each component.

In order to make StyledComponents works, we need install a VSCode plugin called **vscode-styled-components (by Julien Poissonnier)**, the combination of this plugin and _styled-components_ lib will make our JS files understand CSS scripts.

Please, crete [/src/pages/Main/styles.js](./src/pages/Main/styles.js). Open it for further informations.

Now we will apply some styles in our [Main component](./src/pages/Main/index.js).

Important to note that the first concept to use Styled Component is that each tag will be a styled component.

We can use also chained styles - same in CSS processosr like SASS (see in [Style Component](./src/pages/Main/styles.js) and [Main component](./src/pages/Main/index.js)).

Another feature is that **we can set a property and depending of the value it will apply another stylization in our component**.

# Global stylization

Let's prepare our project to have one global stylization.

We need to create [/src/styles/global.js](./src/styles/global.js), please open this file for more information.

Now let's import it into our [App component](./src/App.js).

# Stylize Main page

### How to put an icon?

We can put images like PNG, GIF, SVG, and so on.

However we will install `$ yarn add react-icons` that will offer the famous packages of icons (FontAwesome, Material Icons...).

Import this lib into the desired component (we are working at [Main component](./src/pages/Main/index.js) and you can check out there).

### When do we decide wether we use a Styled Component or Styled HTML?

When a component has more than 2 levels of chaining we can create a new Styled Component.

For example, if we want to create a form as common HTML inside a styled component:

```javascript
export default function Main() {
  return (
    <Container>
      <p>
        <small>
          <strong></strong>
        </small>
      </p>
    </Container>
  );
}
```

In this code above we have Container (1st level), `<p>` (2nd level), `<small>` (3rd level) and `<strong>` (4th level), and we want to apply style in `<strong>`, it will be very verbosed:

```javascript
export const Container = styled.h1`
  p {
    small {
      strong {
        // styles here
      }
    }
  }
`;
```

So, in this case, it is a good practice to create a Styled Component for `<small>` tag that is at 3rd level:

```javascript
export default function Main() {
  return (
    <Container>
      <p>
        <SmallText>
          <strong></strong>
        </SmallText>
      </p>
    </Container>
  );
}
```

And would be less verbose at its style.js:

```javascript
export const SmallText = styled.small`
  strong {
    // styles
  }
`;
```

Another tip is when we work with `<button>`, generally we need to set the type as _submit_ in order to use it as a submit button. If our `<button>` is a Styled Component, how could we set this button as a submit type?

```javascript
<SubmitButton type="submit">Send</SubmitButton>
```

and in SubmitButton component:

```javascript
export const SubmitButton = styled.button.attrs({
  type: 'submit',
})`
  background: #000;
  border: 0;
  padding: 0 15px;
`;
```

# Adding repositories

You can check out at [Main Component](./src/pages/Main.index.js).

There are many way to use APIs. We can use the native `fetch()`, but with it we cannot define, for example, our `base_url`, and another limitations.

We will use **Axios**: `$ yarn add axios`

Let's create [/src/services/api.js](./src/services/api.js) and configure it (go there to see the implementations).

### Some tips for several requests in sequence

Suppose if I have two requests to make in a remote API:

```javascript
const repository = await api.get(`/repos/${repoName}`);
const issues = await api.get(`/repos/${repoName / issues}`);
```

It will work normally, however the second requesting will run only after the first request finishes.

We can implement a trick that we manka a unique request for both.

```javascript
const [repository, issues] = await Promise.all([
  api.get(`/repos/${repoName}`),
  api.get(`/repos/${repoName / issues}`);
])
```

# Navigating in routes

We will apply routes navigation at [Main Component](./src/pages/Main/index.js) (check it up for more details).

Note that we cannot simply use `<a href="./repository/3">Repository Sample</a>` because if user click on it the current page will load and we are dealing with SPA.

We can navigate using `<Link>` component and also we can use pure JS by `this.prop.navigate`. However we will adopt to use **Link Component**.

```javascript
<Link to={`/repository${repoName}`}>Click here</Link>
```

And, at [route file](./src/routes.js), we will include one param:

```javascript
<Route path="/repository/:repository" component={Repository} />
```

`:repository` is our dynamic param, or the name of repository.

Now, at [Repository Component](./src/pages/Repository/index.js) we can use the follow to get the URL value (`:repository`):

```javascript
export default function Repository({ match }) {
  return <h1>Repository: {decodeURIComponent(match.params.repository)}</h1>;
}
```

Note you that `match` is a destructured object that get params from URL by `match.params.<param>`.
