const swagger = require('../common/swagger')

class SwaggerController {
  async doc (ctx) {
    ctx.body = await swagger.generateSwagger()
  }
  async index (ctx) {
    await ctx.render('index.html', {url: '/swagger.json'})
  }
}

const swaggerdoc = new SwaggerController()
module.exports = swaggerdoc
