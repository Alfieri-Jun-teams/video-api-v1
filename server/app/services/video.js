const BaseService = require('../common/base_service')

class VideoService extends BaseService {
  async index (ctx, params) {
    const pagination = params.pagination
    const page = params.page
    const size = params.size
    const sql = ctx.knex('video_list').whereNull('deleted_at')
    if (params.name) sql.where('name', 'like', `%${params.name}%`)
    if (params.tag) sql.where('tags', 'like', `%${params.tag}%`)
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
  async create (ctx, params) {
    const video = await ctx.knex('vedio_list').whereNull('deleted_at').where('url', params.url).first()
    if (video) ctx.throw('该视频已存在', 400)
    params.reply = 0
    params.favorite = 0
    params.share = 0
    if (params.tags) params.tags = JSON.stringify(params.tags)
    const result = await super.create(params)
    return result
  }
  async show (ctx, params) {
    const video = await super.show(params)
    return video
  }
  async update (ctx, params) {
    if (params.favorite || params.reply || params.share) ctx.throw('关于数字字段不许修改', 400)
    const updateResult = await super.update(params)
    return updateResult
  }
  async destroy (ctx, params) {
    const deleteResult = await super.destroy(params)
    return deleteResult
  }
}

const video = new VideoService()
module.exports = video
