const KoaRouter = require('koa-router')
const user = require('../controller/user')
const swagger = require('../controller/swagger')
const api = KoaRouter()

api.get('/users', user.index)
api.post('/users', user.create)
api.get('/users/:id', user.show)
api.put('/users/:id', user.update)
api.delete('/users/:id', user.destroy)

api.get('/swagger.json', swagger.doc)
api.get('/apidoc', swagger.index)

module.exports = api
