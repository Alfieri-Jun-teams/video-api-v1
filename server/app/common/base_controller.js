const convert = require('joi-to-json-schema')
const Validator = require('jsonschema').Validator
const v = new Validator()

class BaseController {
  async validate (schema, model, json, ctx, next, options) {
    const jsonSchema = convert(schema)
    if (model.requestBody) {
      const required = model.requestBody.required
      jsonSchema.required = required
      const result = await v.validate(json, jsonSchema)
      if (result.errors[0]) {
        ctx.throw(422, result.errors[0].message)
      }
    }
  }
}

module.exports = BaseController
