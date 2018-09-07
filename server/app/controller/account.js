const Account = require('../models/account')
const BaseController = require('../common/base_controller')
const service = require('../services')

class AccountController extends BaseController {
  async login (ctx) {
    const params = ctx.request.body
    await super.validate(Account.schema, Account.login, params, ctx)
    ctx.body = await service.account.login(ctx, params)
  }
  async index (ctx) {
    const params = ctx.query
    ctx.body = await service.account.index(ctx, params)
  }
  async show (ctx) {
    const params = ctx.params
    ctx.body = await service.account.show(ctx, params)
  }
  async update (ctx) {
    const params = Object.assign(ctx.params, ctx.request.body)
    ctx.body = await service.account.update(ctx, params)
  }
  async destroy (ctx) {
    const params = ctx.params
    ctx.body = await service.account.destroy(ctx, params)
  }
}

const account = new AccountController()
module.exports = account
