const User = require('../models/user')
const BaseController = require('../common/base_controller')
const service = require('../services/user')

class UserController extends BaseController {
  async index (ctx) {
    const params = ctx.query
    ctx.body = await service.index(params)
  }
  async create (ctx) {
    const params = ctx.request.body
    await super.validate(User.schema, User.create, params, ctx)
    ctx.body = await service.create(params)
  }
  async show (ctx) {
    const params = ctx.params
    ctx.body = await service.show(params)
  }
  async update (ctx) {
    const params = Object.assign(ctx.params, ctx.request.body)
    ctx.body = await service.update(params)
  }
  async destroy (ctx) {
    const params = ctx.params
    ctx.body = await service.destroy(params)
  }
}

const user = new UserController()
module.exports = user
