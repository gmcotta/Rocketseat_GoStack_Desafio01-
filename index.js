const express = require("express");

const server = express();
server.use(express.json());

let numberReq = 0;
server.use((req, res, next) => {
  numberReq += 1;
  console.log(`Number of requests: ${numberReq}`);
  next();
});

function checkIdExists(req, res, next) {
  for (index in projects) {
    if (projects[index].id == req.params.id) {
      return next();
    }
  }
  return res.status(400).json({
    error: "The project does not extist"
  });
}

const projects = [];

server.post("/projects", (req, res) => {
  const { id, title } = req.body;
  projects.push({
    id: String(id),
    title: title,
    tasks: []
  });
  return res.json(projects);
});

server.get("/projects", (req, res) => {
  return res.json(projects);
});

server.put("/projects/:id", checkIdExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  for (index in projects) {
    if (projects[index].id == id) {
      projects[index].title = title;
    }
  }

  return res.json(projects);
});

server.delete("/projects/:id", checkIdExists, (req, res) => {
  const { id } = req.params;

  for (index in projects) {
    if (projects[index].id == id) {
      projects.splice(index, 1);
    }
  }

  return res.send();
});

server.post("/projects/:id/tasks", checkIdExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  for (index in projects) {
    if (projects[index].id == id) {
      projects[index].tasks.push(title);
    }
  }

  return res.json(projects);
});

server.listen(3000);
