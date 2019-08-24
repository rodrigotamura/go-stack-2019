# Prerequisites for this application

The implementation of this application we used a Docker container with Postgres installed.
`$ docker run --name database -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres`

# Sucrase

### Why sucrase?

Actually Node cannot support the new features of the modern Javascript syntax.
That's why we use `require()` (from CommonJS) to import instead `import express from 'express'`.

Whether you want to use the latest syntax from JS in Node, you will need some add-ons, like Babel, BabelNode, but we can use **Sucrase** that will do it very fast!

### Installing Sucrase

```
$ yarn add sucrase -D
```

(yes, `-D` flag for developer dependency)

### Using Sucrase

```
$ yarn sucrase-node <server_init_file.js>
```

### Sucrase + Nodemon

In order to integrate Nodemon (live reload) along with Sucrase, we need make the following:

1. Create `nodemon.json` in root of the project and put the following content:

```
{
  "execMap": {
    "js": "sucrase-node"
  }
}
```

_(each JS file will add and execute that command)_

# Sequelize

Sequelize is an ORM for NodeJS fo SQL database.
(you can [see here](./Sequelize.pdf) about it with more details)

### About ORM

Each table from DB will be a Model in our application.
Table _clients_ in DB will be _Client.js_ in our application.

We will not use directly SQL queries, but JS code to handle our DB.

In SQL:

```
INSERT INTO users(name, email)
  VALUES (
    "Rodrigo Tamura",
    "rodrigotamura@hotmail.com"
  )
```

In JS:

```
User.create({
  name: 'Rodrigo Tamura',
  email: 'rodrigotamura@hotmail.com'
})
```

### Migrations

With this feature we will have version control for our DB.

With migrations we will manage the structure of DB, such as creation, changes or removes of tables or columns.

It is possible to undo a migration if it has some mistake.

### Seeds

It is a test environment (NEVER for producing environment), that produces fake data in our DB in order to test our application with a set of data.

### Configuring Sequelize in our project

Let's create:

- /src/database/ -> Everything related to DB
- /src/database/migrations -> Migration files
- /src/config/database.js -> Will store the credentials of our DB
- /src/app/controllers
- /src/app/models

Let's install Sequelize: `$ yarn add sequelize` and install Sequelize CLI: `$yarn add sequelize-cli -D`, that the last is an interface of command line that we can create migrations, create models, so on.

Create _.sequelizerc_ (it uses JS syntax, basically in this file we will set the folders that our migrations, models and configs will be stored) with the follow content:

```
const { resolve } = require('path');
module.exports = {
  config: resolve(__dirname, 'src', 'config', 'database.js'),
  'models-path': resolve(__dirname, 'src', 'database', 'models'),
  'migrations-path': resolve(__dirname, 'src', 'database', 'migrations'),
  'seeders-path': resolve(__dirname, 'src', 'database', 'seeds'),
};

```

Let's configure ./src/config/database.js (open this file for more details).

### Creating our first migration

Let's use SequelizeCLI to create a migration:
`$ yarn sequelize migration:create --name=create-users`
(_create-users_ is the table's name)

You can see the details of this migration created at: src/database/migrations/20190824160005-create-users.js

Let's migrate this migration:

`$ yarn sequelize db:migrate`

If you check your configured database, you will see _users_ table and another table called _SequelizeMeta_. This table will generate the versioning of each migrations we did. Each new migration will be included here.

If we need to undo the last migration, we can:
`$ yarn sequelize db:migration:undo`

If we need to reset all migrations:
`$ yar sequelize db:migration:undo:all`

### Creating our first Model

Inside ./src/app/models create a new file called _User.js_ (singular, first upper case).

After configurate _User.js_ we need to initialize it in our application in roder to CRUD.

### Creating connection between app and DB and linking with Models

This file will load the Models as well: /src/database/index.js (open it for more details).

After this configuration, we need call this connection into our app and import database.js in app.js.

Now, let's test this implementation going to routes.js (of course, this implementation should be in a controller, but this is only a test).

In a development environment, Sequelize will return all queries in Node console.

# MVC Architecture - Important approaches

For detailed approaches, [click here](./Sequelize.pdf)

### Controller

It will never call another controller.

Controller will have only 5 methods:

- index(): list
- show(): Show details of one register
- update(): Change one register
- delete(): Remove one register

A Controller could not have more than these 5 methods.

Wether a controller surpass 5 methods, we are taking now the approaching of **ENTITIES**.

# Code standardize

It's very important to standardize our code in order to not mess it up and harm the future maintenances.

That's why we will implement an auto standardize in our project's code whit **eslint**:

```
$ yarn add eslint
```

List is a feature that check our code and fix everything out of standard automatically.

With the follow command ESlint will check our code for standardize mistakes:

```
$ yarn eslint --init
```

And we will select the follow options:

1. To check syntax, find problems, and enforce code style
2. Javascript modules (import/export)
3. None of these
4. Uncheck _Browser_ and check _Node_
5. Use a popular style guide
6. Airbnb
7. Javascript
8. Confirm the installation

A file called **.eslintrc.js** is created in the root of our project. We will implement some rules in this configuration file:

```
rules: {
    "class-methods-use-this": "off", // it will disable to put 'this' auto
    "no-param-reassign": "off", // allow to receive and make changes of params
    "camelcase": "off", // avoiding camelCase
    // ESlint does not allow to declare variables that we are not using
    // so, at the follow config we are escaping 'next' variable
    "no-unused-vars": ["error", { argsIgnorePattern: "next" }]
  }
```

(TIP: If we are using YARN, instead of NPM, for manage our packages, a file called _package-lock.json_, because we are using _yarn.lock_)

It's important to have in our VSCode a plugin called ESLint (Dirk Baeumer).

From this instalation we can see in our JS code the errors that indicate syntaxes out of the AirBNB patterns.

However we can program ESlint to fix the errors automatically when we save the files:

1. Open _Preferences: Open Settings (JSON)_
2. Paste the following configurations:

```
{
  "eslint.validate": [
    {
      "language": "javascript",
      "autoFix": true
    },
    {
      "language": "javascriptreact",
      "autoFix": true
    },
    {
      "language": "typescript",
      "autoFix": true
    },
    {
      "language": "typescriptreact",
      "autoFix": true
    },
  ]
}
```

### Prettier

It will bealty our code automatically.

```
$ yarn add prettier eslint-config-prettier eslint-plugin-prettier -D
```

_eslint-config-prettier_ and _eslint-plugin-prettier_ are packages that will integrate ESlint with Prettier.

Now let's open _.eslintrc.js_ and change or add the follow metadatas:

```
extends: ['airbnb-base', 'prettier'],
plugins: ['prettier'],
rules: {
    "prettier/prettier": "error",
    ...
}
```

If you test saving some JS file from your project, you will realize that everything that use double quotes ('), that is a patter we will adopt (AirBNB), will be changed to single quotes ('), because within _extends_ from _.eslintrc.js_ there is a conflict between _airbnb-base_ and _prettier_.

To fix it we will create another file in our root called **.prettierrc** to adopt only single quotes. Implement the follow content:

```
{
  "singleQuote": true,
  "trailingComma": "es5"
}

```

#### Using linter and prettier in all files inside one folder

```
$ yarn eslint --fix <folder> --ext .js
```

### Standizing IDE's for the team

Let's install **EditorConfig for VS Code** (Author: EditorConfig).

Right-click on root folder (file explorer) from our project and click on _Generate .editorconfig_:

```
root = true

[*]
indent_style = space
indent_size = 2
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true
```

# Generating hash of passwords

As you see, our User Model receive a column called _password_hash_, that will store a hash of the password instead of true password.

To generate this hash, we will need a dependency called **bcryptjs**:

`$ yarn add bcryptjs`

You can see the implementation in ./src/app/models/User.js

# JWT - Json Web Token

You can see details [here](./Conceitos+de+JWT.pdf)

It's a manner of authentication on REST API.

We will work with http://localhost:3333/**sessions** route in order to implement JWT Authentication.

### Implementing JWT

We will create src/app/controllers/SessionController.js (open it to see in details).

We also need to install new extension that will create our JWT token:

`$ yarn add jsonwebtoken`

Import it in SessionController.js.

In SessionController we will see the store method that will return to user the token, if succeed with its login.

Note that the returning object to authenticated user uses **hash passphrase** and **expiration time**. Let's separate them into another config file: _./src/config/auth.js_.

### Middleware of authentication

Let's prevent our routes for not logged users. Let's protect our route that update a user data.

The best way to protect our routes is through MIDDLEWARES.

Let's create _src/app/middlewares/auth.js_. Check this created file for more details.

# Validation

There are many ways to validate external data, but we will use **Yup**.
`$ yarn add yup`

YUP is a library of schema-validation.

Let's import it within Controller we eant to validate external data. You can see in UserController.
