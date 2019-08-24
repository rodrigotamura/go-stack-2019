// start of everything
const express = require("express");

// starting our application
const server = express();

// allowing requests by JSON
server.use(express.json());

const projects = [];
var conting = 0;

// middlewares
server.use((req, res, next) => {
  console.log(`You requested for ${++conting} times`);

  return next();
});

function checkIdExists(req, res, next) {
  const { id } = req.params;

  if (projects.findIndex(proj => proj.id == id) === -1) {
    return res.status(400).json({ msg: "ID not exists" });
  }
  return next();
}

// routes
server.get("/projects", (req, res) => {
  return res.json(projects);
});

server.post("/projects", (req, res) => {
  const data = req.body;

  projects.push(data);

  return res.json(projects);
});

server.put("/projects/:id", checkIdExists, (req, res) => {
  // getting id from URL param
  const { id } = req.params;
  const { title, tasks } = req.body;
  // getting index of projects by requested id
  const index = projects.findIndex(proj => proj.id == id);
  projects[index] = [title, tasks];

  return res.send(projects[index]);
});

server.delete("/projects/:id", checkIdExists, (req, res) => {
  // getting id form URL param
  const { id } = req.params;
  const index = projects.findIndex((proj, index) => proj.id == id);

  // removing from array
  projects.splice(index, 1);

  return res.send();
});

server.post("/projects/:id/tasks", checkIdExists, (req, res) => {
  // getting id form URL param
  const { id } = req.params;
  const index = projects.findIndex((proj, index) => proj.id == id);
  const { title } = req.body;

  projects[index]["tasks"].push(title);

  return res.json(projects[index]);
});

server.listen(3000);
