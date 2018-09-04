const config = require('../../config')
const knex = require('knex')({
  client: config.knex.client.dialect,
  connection: config.knex.client.connection
})

class BaseService {
  static async findOne (table, params) {
    const entity = await knex(table)
      .where(params)
      .whereNull('deleted_at')
      .first()
    if (!entity) throw new Error('NOT EXISTS')
    return entity
  }
  async exists (table, params) {
    if (typeof table !== 'string') throw new Error('table must be string!!!')
    if (typeof params !== 'object') throw new Error('params must be object!!!')
    const result = await BaseService.findOne(table, params)
    return result
  }
  async create (table, params) {
    if (typeof table !== 'string') throw new Error('table must be string!!!')
    if (typeof params !== 'object') throw new Error('params must be object!!!')
    const [id] = await knex(table).insert(params)
    return id
  }
  async show (table, params) {
    if (typeof table !== 'string') throw new Error('table must be string!!!')
    if (typeof params !== 'object') throw new Error('params must be object!!!')
    const id = params.id
    let condition = {id: id}
    const result = await BaseService.findOne(table, condition)
    return result
  }
  async update (table, params) {
    if (typeof table !== 'string') throw new Error('table must be string!!!')
    if (typeof params !== 'object') throw new Error('params must be object!!!')
    const id = params.id
    let condition = {id: id}
    params.updated_at = new Date()
    await BaseService.findOne(table, condition)
    const result = await knex(table)
      .where('id', params.id)
      .update(params)
    return result
  }
  async destroy (table, params) {
    if (typeof table !== 'string') throw new Error('table must be string!!!')
    if (typeof params !== 'object') throw new Error('params must be object!!!')
    const id = params.id
    let condition = {id: id}
    await BaseService.findOne(table, condition)
    const result = await knex(table)
      .where('id', id)
      .update({deleted_at: new Date()})
    return result
  }
  paginate ({ count, page, size }) {
    return {
      page: +page,
      size: +size,
      row_count: count,
      page_count: Math.ceil(count / size)
    }
  }
}

module.exports = BaseService
