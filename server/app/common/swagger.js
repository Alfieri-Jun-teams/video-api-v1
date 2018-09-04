const fs = require('fs')
const Joi = require('joi')
const convert = require('joi-to-json-schema')
const _ = require('lodash')

const generateSwagger = (modelPath = './app/models') => {
  // TODO 未考虑文件夹下嵌套文件夹
  const items = fs.readdirSync(modelPath)
  let methods = []
  let components = {}
  components.schemas = {}
  // const parameters = {}
  items.forEach(item => {
    let model = require('../models/' + item)
    item = item.replace(/\.\w+$/, '')
    let schemaName = item.slice(0, 1).toUpperCase() + item.slice(1)
    for (let index in model) {
      if (index === 'schema') {
        const modelSchema = convert(model[index])
        let schema = {}
        schema[schemaName] = {
          'type': 'object',
          'properties': modelSchema.properties
        }
        components.schemas = _.merge(components.schemas, schema)
      } else {
        const content = {
          tags: model[index].tags,
          summary: model[index].summary,
          description: model[index].description
        }

        // content.parameters = []
        if (model[index].query) {
          content.parameters = []
          let params = convert(Joi.object(model[index].query))
          for (let prop in params.properties) {
            let field = {}
            field.name = prop
            field.in = 'query'
            field.description = params.properties[prop].description
            field.schema = {
              'type': params.properties[prop].type
            }
            field.required = false
            content.parameters.push(field)
          }
        }

        if (model[index].params) {
          content.parameters = []
          let params = convert(Joi.object(model[index].params))
          for (let prop in params.properties) {
            let field = {}
            field.name = prop
            field.in = 'path'
            field.description = params.properties[prop].description
            field.schema = {
              'type': params.properties[prop].type
            }
            field.required = true
            content.parameters.push(field)
          }
        }

        // if (model[index].header) {
        //   let params = convert(Joi.object(model[index].header))
        //   for (let prop in params.properties) {
        //     let field = {}
        //     field.name = prop
        //     field.in = 'header'
        //     field.description = params.properties[prop].description
        //     field.items = {
        //       'type': params.properties[prop].type
        //     }
        //     field.required = true
        //     parameters[prop] = field
        //     content.parameters.push({'$ref': `#/parameters/${prop}`})
        //   }
        // }

        if (model[index].requestBody) {
          let params = convert(Joi.object(model[index].requestBody.body))
          let request = {}
          request.requestBody = {}
          let bodySchema = request.requestBody
          bodySchema.required = true
          bodySchema.content = {
            'application/json': {
              'schema': {
                'type': params.type,
                'properties': params.properties,
                'required': model[index].requestBody.required
              }
            }
          }
          content.requestBody = request.requestBody
        }

        let schema = model[index].output ? convert(model[index].output) : {$ref: `#/components/schemas/${schemaName}`}
        content.responses = {
          200: {
            'description': 'response success',
            'content': {
              'application/json': {
                'schema': schema
              }
            }
          }
        }

        let swaggerMethod = {}
        swaggerMethod[(model[index].method).toString()] = content

        let swaggerItem = {}
        swaggerItem[(model[index].path).toString()] = swaggerMethod
        methods.push(swaggerItem)
      }
    }
  })

  let mergeMethod = {}
  for (let i = 0; i < methods.length; ++i) {
    mergeMethod = _.merge(mergeMethod, methods[i])
  }

  let swagger = {}
  swagger.openapi = '3.0.0'
  swagger.info = {
    'title': 'Demo API document',
    'version': 'v3',
    'description': 'Using swagger3.0 & joi to generate swagger.json',
    'contact': {
      'name': 'AlfieriChou',
      'email': 'alfierichou@gmail.com',
      'url': 'https://alfierichou.com'
    },
    'license': {
      'name': 'MIT',
      'url': 'https://github.com/Alfieri-Jun-teams/koa_joi_swagger/blob/master/LICENSE'
    }
  }
  swagger.paths = mergeMethod
  swagger.components = components
  return swagger
}

module.exports = {
  generateSwagger
}
