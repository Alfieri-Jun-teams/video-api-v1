const KoaRouter = require('koa-router')
const controller = require('./controller')
const api = KoaRouter()

api.prefix('/v1')
api.get('/users', controller.user.index)
api.post('/users', controller.user.create)
api.get('/users/:id', controller.user.show)
api.put('/users/:id', controller.user.update)
api.delete('/users/:id', controller.user.destroy)

api.post('/login', controller.account.login)

api.get('/accounts', controller.account.index)
api.get('/accounts/:id', controller.account.show)
api.put('/accounts/:id', controller.account.update)
api.delete('/accounts/:id', controller.account.destroy)

api.get('/videos', controller.video.index)
api.post('/videos', controller.video.create)
api.get('/videos/:id', controller.video.show)
api.put('/videos/:id', controller.video.update)
api.delete('/videos/:id', controller.video.destroy)

api.get('/swagger.json', controller.swagger.doc)
api.get('/apidoc', controller.swagger.index)

module.exports = api
