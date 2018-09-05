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
  async index (ctx, params) {
    const pagination = params.pagination
    const page = params.page
    const size = params.size
    const sql = ctx.knex('account').whereNull('deleted_at')
    if (params.nickname) sql.where('nickname', 'like', `%${params.nickname}%`)
    if (params.phone) sql.where('phone', params.phone)
    if (params.role) sql.where('role', params.role)
    let data
    switch (typeof pagination !== 'undefined') {
      case true:
        const countSql = sql.clone()
        const { count } = await countSql.count('* as count').first()
        sql.offset((page - 1) * size).limit(size)
        const result = await sql
        data = {}
        data.result = result
        data.paginate = super.paginate({ count, page, size })
        break
      case false:
        data = await sql
        break
    }
    return data
  }
}

const account = new AccountService()
module.exports = account
