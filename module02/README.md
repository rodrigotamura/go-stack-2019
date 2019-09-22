# About this project

Welcome! This is GoBarber API, made with 💟 with Express Framework (Node.js).

Please, visit [**GoBarber - Provider App**](https://github.com/rodrigotamura/go-barber-web) made with ReactJS which consumes this API.

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

### Making relationship between Models

Firstly, if it is necessary to create a column with 1:1 relationship, we need create a migration with the follow configuration:

```
return queryInterface.addColumn('users', 'avatar_id', {
  type: Sequelize.INTEGER,
  references: { model: 'files', key: 'id' }, // Foreign Key reference
  onUpdate: 'CASCADE', // when image is updated, this filed will be updated also
  onDelete: 'SET NULL', // when image is deleted, this field will be NULL
  allowNull: true,
});
```

Within User's Model, we will create a new method:

```
static associate(models) {
  this.belongsTo(models.File, { foreignKey: 'avatar_id' });
}
```

Now we need to call this method in /src/database/index.js ([more details](./src/database/index.js))

# NoSQL

Sequelize is an ORM for SQL databases. With NoSQL we will use **Mongoose**.

Let's create ao docker container to make MongoDB server:
`$ docker run --name mongobarbaer -p 27017:27017 -d -t mongo`

In this app we are working also with PostGreSQL (Sequelize). It means that we will work with 2 databases.

Let's open [/src/database/index.js](/src/database/index.js) for more details.

With MongoDB we will sotore notifications in order to send to Provider for new appointments.

We need to create our Schemas for our MongoDB. Schemas it's like tables for SQL DBs. We will create in [/src/app/schemas/Notification.js](/src/app/schemas/Notification.js). Open this file for further information.

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

### Validating Date

We will install a lib called **date-fns** with the actual version (@next):
`$ yarn add date-fns@next`

You can check datails in [AppointmentController](./src/app/controllers/AppointmentController.js)

#### Locale on datetime with Date-FNS

Please, check it out in [./src/app/controllers/AppointmentController.js](./src/app/controllers/AppointmentController.js) for further details.

# File upload

In our app, we will implement a feature that will allow the service providers to upload their avatar image. During registration, when the user selects the image, it will upload automatically and our API will send an ID of this image. And finally when the user finish his registration by submiting the form registration, it will send the ID of this image.

We could not send the image together with the form content, because JSON does not support send in its body file format.

We need to install a library that support a different body (_multipart/form-data_), different from JSON, in order to send files called **Multer**.
`yarn add multer`
In the root of our project we will create a folder called _/tmp/uploads_. Within this folder will store every sended file.

We also will create **/src/config/multer.js** ([click here](./src/config/multer.js) for datails), that will store all settings for upload feature.

Afterwards, we will go to our routes, and we will import our multer configs and instance the multer object with multer configurations. Finally we will create a new route that the user will send the files.

Let's test it with Insomnia (or another alternative) and, instead use JSON in body type, we will use _Multipart_. You might see in /tmp/uploads your uploaded file.

# Pagination

By good practices, we use **querystring** to set the number of page (http://localhost:3333/appointments?__page=2__). See how to implement it at [here](./src/app/controllers/AppointmentController.js).

# Sending e-mails

We will install **NodeMailer** in order to send e-mail messages.

`$ yarn add nodemailer`

Then, we create [/src/config/mail.js](./src/config/mail.js). We can use many e-mail services, like Amazon SES, Mailgun, Sparkpost, Mandril (Mailchimp), so on.

Is not recommended to use Gmail, because its limitation.

Here we will use [**MailTrap**](https://mailtrap.io), that works only for developer environment.
(Of course, in production mode we need to use some of we pointed above.)

When we use Mailtrap to test some e-mail sending by our app, we can see this message in out Mailtrap MailBox, however the destination will not receive any message because this is only for test purpose.

### Sending e-mail

Let's create a folder called **lib**. Within this folder we configure the services (like e-mail sender) and prepare every methods to use it, and many times we set the config variables of each service by ./src/config/ folder.

The role of controller in this case is just to send e-mail messages.

So, we create [/src/lib/Mail.js](./src/lib/Mail.js) to implement the initial configuration of NodeMailer. See this file for further details.

Afterwards we will implement in a controller. You can see in [/src/app/controllers/AppointmentController.js](./src/app/controllers/AppointmentController.js)

### Configuring template HTML for e-mail message

We need to use a TEMPLATE ENGINE (basically it is HTML file that receives variables). For that we need to install some libs:

- Handlebars (handlebarsjs.com): `$ yarn add express-handlebars`;
- Nodemailer Express Handlebars: `$ yarn add nodemailer-express-handlebars`
  (the last one will integrate Handlebars along with Nodemailer)

Now, let's open [/src/lib/Mail.js](./src/lib/Mail.js), importing the installed libs and configure them.

We created the follows:

- /src/app/views/emails/layouts/default.hbs -> Default template for our e-mail messages
- /src/app/views/emails/partials/ -> Files that we can import within some e-mail messages that is repetitive (ex.: footer).
- /src/app/views/emails/cancellation.js -> Will be the body of our message in ./layouts/default.hbs (`{{{ html }}}`)

# Configuring queues with Redis

We can see in GoBarber till now, when user cancels one appointment and the aPI sends a message to provider's e-mail it takes more than 1.5 seconds. Besides it, another requesting, like creating new appointment, takes less than 1 second.

How could we improve the time of our request - let's take appointment cancellation example - to be less like another requesting?

We have two manner to do it:

1. We take off `await` from sendMail() method. The problem is when some error is given on sending e-mail, we will never know about it.

2. The best way to control actions that spend more time and it is not necessary to finish in same time the client receive the response, but we want to have control over these actions (retryings, geting errors, set priorities) working with **QUEUES** or **BACKGROUND JOBS**.

To implement QUEUES, we need a key-value database like **Redis**.

Redis is a non-relational database (like MongoDB), the difference is thar Redis we can not have schemas, or structures of data, but only work with key-value pairs. That`s why Redis will be more performatic.

We need a server for Redis database. Let's create a container:

`$ docker run --name redisbarber -p 6379:6379 -d -t redis:alpine`

Afterwards we need install a tool for queue called **BeeQueue** for NodeJS.

BeeQueue is very performatic, however it does not have job priorization manager. For this purpose we can install another tool, like _Kue_ (less performatic).

In our case we work only with retry and handle errors of our e-mail sendings.

Installing BeeQueue:

`$ yarn add bee-queue`

### Configuring Redis

Let's create [/src/config/redis.js](./src/config/redis.js) to set connection to Redis server.

### Configuring BeeQueue

Let's create [/src/lib/Queue.js](./src/lib.Queue.js).

We can have many queues.
Each kind of service/background job will have its own queue
For example, send mail for appointment cancellation will have its own queue
Send mail for password recovery will have its own queue.

**Every works within queues are called JOBS**.

So, we will crate folder `/src/app/jobs` in order to store every BACKGROUND JOBS.

Finally we will create [/src/queue.js](./src/queue.js).

We are creeating this file because basically we will not execute the application in same execution that we will execute the queues.
Because we can run queues in another server, in a core of processor will more or less resources tottaly separated from our application. So the queue never influences the performance of our application.

For example. In one terminal we are running our application with `$ yarn dev`. And we can open another terminal we can run `$ node src/queue.js`.

Note that we need implement Sucrase in src/queue.js:

In [package.json](./package.json), we will include a new _script_:

```
"scripts": {
  "dev": "nodemon ./src/server.js",
  "queue": "nodemon ./src/queue.js"
}
```

### Monitoring fails in queue

We will implement in [/src/lib/Queue.js](./src/lib/Queue.js), in `processQueue()` method, adding `bee.on('failed).process(handle);`.

BeeQueue has many kinds of events. Here we are using _failed_, when something gonna worng.

# Error handling

In order to manage all errors from our application, we will install Sentry (another alternative is Bugsnag).

You need to access [https://sentry.io](https://sentry.io) and create a new account and afterwards we will create a new project. Select Express for this new project, and finally Sentry will give the instructions to implement in our project.

Let's implement in ou [/src/app.js](./src/app.js). We also create Sentry's configuration in [/src/config/sentry.js](./src/config/sentry.js).

By default, whe we use async with Express, it will can not get and it will not send to Sentry. However we can install a lib that will fix it:

`$ yarn add express-async-errors`

And import it in [/src/app.js](./src/app.js) **BEFORE import routes**.

If we trye to make an error and execute the script, we can now find it out in Sentry to see the error details.

OK, Sentry is getting the errors, but in Insomnia the user keep waiting for some response. And we need to implement it. In [/src/app.js](./src/app.js), we will implement `exeptionHandler()`.

When we create a Middleware of error handling we need to receive as the first param the error
Express will detect that, if some middleware is build with 4 parameters, it will be considered a middleware of error handling.

Let's install another lib called **Youch**: `$ yarn add youch`

**Youch** will treat the errors to be more beautiful for developer.

You'll see now the errors detailed.

# Configuring environmet variables

We will learn how to manage environment variables, that will change according to which environment our application is running.

For example, the variables of DB connection.

First of all, we will create [.env](./.env).

**Important**: For secure reasons, we need add `.env` file in `.gitignore`.

After, we need load these variables with **dotEnv**: `$ yarn add dotenv`

We will go to [/src/app.js](./src/app.js) and import it.
(do not forget to import it in [/src/queue.js](./src/queue.js))

Now we can access these variable calling by `_process.env.VARIABLE_IN_DOTENV_`.

We need to import it in [/src/config/database.js](./src/config/database.js).

A good practice is to create [.env.example](./.env.example) taking off every secret configuration in order to the next developer that clone our application will set each variable.

# CORS

It allows this API to be accessed by other apps (e.g. front-ends).

`yarn add cors`

We can configure which addresses could access the API.

```javascript
this.server.use(cors()); // allows any apps to access this API
this.server.use(cors({ origin: 'https://somewhere.com' })); // allow only apps which are in this host
```

Please, check out [app.js](./src/app.js) for further details.
