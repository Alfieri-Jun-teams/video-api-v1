const BaseService = require('../common/base_service')
const jwt = require('jsonwebtoken')
const moment = require('moment')

const createToken = (phone) => {
  let payload = {
    sub: phone,
    exp: moment().add(7, 'day').unix()
  }
  return jwt.sign(payload, 'supreme')
}

class AccountService extends BaseService {
  async login (ctx, params) {
    const account = await ctx.knex('account').where('phone', params.phone).whereNull('deleted_at').first()
    const hashword = await super.genHash(params.password)
    if (hashword === account.password) {
      const token = {}
      token.token = createToken(account.phone)
      return token
    } else {
      ctx.throw(400, '验证失败')
    }
  }
}

const account = new AccountService()
module.exports = account
