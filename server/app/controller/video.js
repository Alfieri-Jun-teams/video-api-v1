const Video = require('../models/video')
const BaseController = require('../common/base_controller')
const service = require('../services')

class VideoController extends BaseController {
  async index (ctx) {
    const params = ctx.query
    ctx.body = await service.video.index(ctx, params)
  }
  async create (ctx) {
    const params = ctx.request.body
    await super.validate(Video.schema, Video.create, params, ctx)
    ctx.body = await service.video.create(ctx, params)
  }
  async show (ctx) {
    const params = ctx.params
    ctx.body = await service.video.show(ctx, params)
  }
  async update (ctx) {
    const params = Object.assign(ctx.params, ctx.request.body)
    ctx.body = await service.update(ctx, params)
  }
  async destroy (ctx) {
    const params = ctx.params
    ctx.body = await service.video.destroy(ctx, params)
  }
}

const vedio = new VideoController()
module.exports = vedio
