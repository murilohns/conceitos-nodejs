const create = (request, response, next) => {
  const { title, url, techs } = request.body

  if (!title) {
    return response.status(400).send({ error: 'paramêtro \'title\' está faltando' })
  }

  if (!url) {
    return response.status(400).send({ error: 'parâmetro \'url\' está faltando' })
  }

  if (!!techs && !Array.isArray(techs)) {
    return response.status(400).send({ error: 'parâmetro \'tech\' deve ser um array' })
  }

  return next()
}

const update = (request, response, next) => {
  const { title, url, techs } = request.body

  if (!!title && typeof title !== 'string') {
    return response.status(400).send({ error: 'paramêtro \'title\' deve ser uma string' })
  }

  if (!!url && typeof url !== 'string') {
    return response.status(400).send({ error: 'parâmetro \'url\' deve ser uma string' })
  }

  if (!!techs && !Array.isArray(techs)) {
    return response.status(400).send({ error: 'parâmetro \'tech\' deve ser um array' })
  }

  return next()
}

module.exports = {
  create,
  update,
}
