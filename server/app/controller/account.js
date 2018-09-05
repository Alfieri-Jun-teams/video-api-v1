const Account = require('../models/account')
const BaseController = require('../common/base_controller')
const service = require('../services/account')

class AccountController extends BaseController {
  async login (ctx) {
    const params = ctx.request.body
    await super.validate(Account.schema, Account.login, params, ctx)
    ctx.body = await service.login(ctx, params)
  }
  async index (ctx) {
    const params = ctx.query
    ctx.body = await service.index(ctx, params)
  }
}

const account = new AccountController()
module.exports = account
