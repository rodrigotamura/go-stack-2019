You can find out more details [here](https://docs.google.com/document/d/1S0piT-jPD45Bk4CLShxhlcTQ6ntPPF9ViPtmfZ55Oqg/edit?usp=sharing).

# NVM

Allows us to install many versions of Node, and set a project to use the right version of Node.

### Installing node version 10.15.3:

```
$ nvm install 10.15.3
```

### Setting it as default version:

```
$ nvm alias default 10.15.3
```

# Live reload - nodemon

In order to enable auto reload, we can use Nodemon. Let's install it:

```
$ yarn add nodemon -D
```

The -D flag means that this package will be installed in Development Environment

Now, let's open package.json of our project and add:

```
"scripts": {
    "dev": "nodemon index.js"
  }
```

Now we can use:

```
$ yarn dev
```

It will execute our project and it is not necessary restart for each change.

## Middlewares concepts

It's a function that receive (req, res) and do something in our application.
Middleware will handle every req and res.
Everything that receive some request and answer with some response (or without response) are considered middlewares.

One way is using as we generally use with routes:

```
// getting one user by index
server.get("/users/:index", (req, res) => {
  const index = req.params.index; // http://localhost:3000/users/1
  // or, using desconstruct
  //  const { id } = req.params;

  return res.send(`Hi, ${users[index]}`);
});
```

Or we can create a **GLOBAL MIDDLEWARE**, no matter the route we access, this middleware will be called.

```
// Example of global middleware:
server.use((req, res, next) => {
  if(user.isAllowedToAccess === false){
    result res.json({ error: 'You don't have access...' });
  }else{
    return next(); // ok, continue the application

  }
})
```

But, within the global middleware, is necessary to execute `return next();` to continue the application flow.

In the next approach, we have another manner to use `next()`:

```
// Example of global middleware:
server.use((req, res, next) => {

  // the foolow manner, the next() - without return - will call the next middleware
  // (it could the the router) and when the next middleware finish "Request finished"
  // will be displayed at the console
  next();

  console.log("Request finished");
})
```

We also have another kind of middleware: **LOCAL MIDDLEWARE** that is implemented
within a route.

Let's create a middleware that will verify if a specific param is passed properly:

```
function checkUserExists(req, res, next) {
  if (!req.body.user) {
    return res
      .status(400) // returning BAD REQUEST (some information is lacking)
      .json({ error: "User name is required" });
  }

  return next();
}

server.get("/users/:id", checkUserExists, middleware2, middleware3, (req, res) => {
  const index = req.params.index; // http://localhost:3000/users/1
  // or, using desconstruct
  //  const { id } = req.params;

  return res.send(`Hi, ${users[index]}`);
})
```

Middlewares can change req contents:

```
function checkUserInArray(req, res, next) {
const user = users[req.params.index];

  if (!user) {
    return res
      .status(400) // returning BAD REQUEST (some information is lacking)
      .json({ error: "User does not exist" });
  }

  req.user = user; // now, the follow middlewares will have this object req.user

  return next();
}

server.get('/users/:id', checkUserInArray, (req, res) => {
  return res.json({ req.user });
} )
```
