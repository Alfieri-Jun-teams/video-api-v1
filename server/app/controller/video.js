const Video = require('../models/vedio')
const BaseController = require('../common/base_controller')
const service = require('../services/vedio')

class VideoController extends BaseController {
  async index (ctx) {
    const params = ctx.query
    ctx.body = await service.index(ctx, params)
  }
  async create (ctx) {
    const params = ctx.request.body
    await super.validate(Video.schema, Video.create, params, ctx)
    ctx.body = await service.create(ctx, params)
  }
  async show (ctx) {
    const params = ctx.params
    ctx.body = await service.show(ctx, params)
  }
  async update (ctx) {
    const params = Object.assign(ctx.params, ctx.request.body)
    ctx.body = await service.update(ctx, params)
  }
  async destroy (ctx) {
    const params = ctx.params
    ctx.body = await service.destroy(ctx, params)
  }
}

const vedio = new VideoController()
module.exports = vedio
