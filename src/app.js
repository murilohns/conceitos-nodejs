const express = require("express");
const { uuid } = require('uuidv4')
const cors = require("cors");

const repositoriesMiddleware = require('./middlewares/repositories')

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.send(repositories)
});

app.post("/repositories", repositoriesMiddleware.create, (request, response) => {
  const { title, url, techs } = request.body

  const repository = {
    id: uuid(),
    title,
    url,
    techs: techs ? techs : [],
    likes: 0,
  }

  repositories.push(repository)

  return response.send(repository)
});

app.put("/repositories/:id", repositoriesMiddleware.update, (request, response) => {
  const { id } = request.params
  const { title, url, techs } = request.body

  const repositoryIndex = repositories.findIndex( repository => repository.id === id)

  if (repositoryIndex < 0) {
    return response.status(400).send({ error: 'repositório não encontrado' })
  }

  repositories[repositoryIndex] = {
    id,
    title: title ? title : repositories[repositoryIndex].title,
    url: url ? url : repositories[repositoryIndex].url,
    techs: techs ? techs : repositories[repositoryIndex].techs,
    likes: repositories[repositoryIndex].likes,
  }

  return response.send(repositories[repositoryIndex])
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params

  const repositoryIndex = repositories.findIndex(repository => repository.id === id)

  if (repositoryIndex < 0) {
    return response.status(400).send({ error: 'repositório não encontrado' })
  }

  repositories.splice(repositoryIndex, 1)

  return response.status(204).send()
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params

  const repositoryIndex = repositories.findIndex(repository => repository.id === id)

  if (repositoryIndex < 0) {
    return response.status(400).send({ error: 'repositório não encontrado' })
  }

  repositories[repositoryIndex].likes++

  return response.send(repositories[repositoryIndex])
});

module.exports = app;
