const request = require('supertest')
const should = require('should')
const server = require('./index')
const describe = require('mocha').describe
const it = require('mocha').it

let swagger

describe('GET /swagger.json!!!', function () {
  it('respond with json', function () {
    request(server)
      .get('/v1/swagger.json')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        swagger = response.body
      })
  })
})

describe('test swagger', () => {
  it('swagger.json mast be an Object!!', () => {
    should(swagger).be.an.Object()
  })

  it('swagger.json have property openapi!!', () => {
    should(swagger).have.property('openapi', '3.0.0')
  })
})

describe('GET /apidoc!!!', function () {
  it('respond with json', function () {
    request(server)
      .get('/v1/apidoc')
      .set('Accept', 'text/html')
      .expect(200)
      .then(response => {
        should(response.body).be.html
      })
  })
})
