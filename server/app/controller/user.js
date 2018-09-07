const User = require('../models/user')
const BaseController = require('../common/base_controller')
const service = require('../services')

class UserController extends BaseController {
  async index (ctx) {
    const params = ctx.query
    ctx.body = await service.user.index(params)
  }
  async create (ctx) {
    const params = ctx.request.body
    await super.validate(User.schema, User.create, params, ctx)
    ctx.body = await service.user.create(params)
  }
  async show (ctx) {
    const params = ctx.params
    ctx.body = await service.user.show(params)
  }
  async update (ctx) {
    const params = Object.assign(ctx.params, ctx.request.body)
    ctx.body = await service.user.update(params)
  }
  async destroy (ctx) {
    const params = ctx.params
    ctx.body = await service.user.destroy(params)
  }
}

const user = new UserController()
module.exports = user
