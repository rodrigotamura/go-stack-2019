const express = require("express");

// Starting our application
const server = express();

// Let's import this module in order to allow to receive JSON requests
// because without this command we cannot send any JSON in the body requests
server.use(express.json());

// routes
server.get("/teste", (req, res) => {
  const nome = req.query.nome; // http://localhost:3000/teste?nome=Rodrigo

  // without response the script will loop

  // return res.send("Paz do Senhor!"); // it will only shows the string
  return res.json({ message: `Paz do Senhor, ${nome}!` }); // returning a JSON response
});

// Let`s CRUD!!!!

const users = ["Rodrigo", `Tetsuya`, "Tamura"];

// Global middleware
server.use((req, res, next) => {
  // we can implement some log registration here
  console.log(`Method: ${req.method}; URL: ${req.url}`);

  return next();

  /* 
  // the foolow manner, the next() - without return - will call the next middleware 
  // (it could the the router) and when the next middleware finish "Request finished"
  // will be displayed at the console
  next();

  console.log("Request finished"); */
});

// Local middleware
function checkUserExists(req, res, next) {
  if (!req.body.user) {
    return res
      .status(400) // returning BAD REQUEST (some information is lacking)
      .json({ error: "User name is required" });
  }

  return next();
}

// Another middleware - Verifying if index is valid
function checkUserInArray(req, res, next) {
  const user = users[req.params.index];

  if (!user) {
    return res
      .status(400) // returning BAD REQUEST (some information is lacking)
      .json({ error: "User does not exist" });
  }

  req.user = user;

  return next();
}

// getting one user by index
server.get("/users/:index", checkUserInArray, (req, res) => {
  return res.send(`Hi, ${req.user}`);
});

// Getting all users
server.get("/users", (req, res) => {
  console.log("Searching for users...");
  return res.json(users);
});

// For new user
server.post("/users", checkUserExists, (req, res) => {
  // Now we will get the content from the body of request
  const { name } = req.body;

  users.push(name);

  // LET`S DEBUG

  return res.json(users);
});

// changing name
server.put("/users/:index", checkUserExists, checkUserInArray, (req, res) => {
  const { index } = req.params;
  const { name } = req.body;

  users[index] = name;

  return res.json(users);
});

// deleting user
server.delete("/users/:index", checkUserInArray, (req, res) => {
  const { index } = req.params;
  users = users.splice(index, 0);

  // normally, is not necessary to return any arguments
  // only 200 code is fine!
  return res.send();
});

// Listen a specific port
// it means that if the execute the command
// > node index.js
// we will create a server accesed by
// http://localhost:3000/
server.listen(3000);
