const request = require('supertest')
const should = require('should')
const server = require('./index')
const describe = require('mocha').describe
const it = require('mocha').it

describe('login!!!', () => {
  it('success!!', () => {
    request(server)
      .post('/v1/login')
      .send({phone: '18585855858', password: 'super123'})
      .set('Accept', 'application/json')
      .expect(200)
      .then(res => {
        should(res.body.token).be.String
      })
  })

  it('requires property "password"', () => {
    request(server)
      .post('/v1/login')
      .send({phone: '18585855858'})
      .set('Accept', 'application/json')
      .expect(422)
      .then(response => {
        should(response.error.text).match('requires property "password"')
      })
  })

  it('requires property "phone"', () => {
    request(server)
      .post('/v1/login')
      .send({password: 'super123'})
      .set('Accept', 'application/json')
      .expect(422)
      .then(response => {
        should(response.error.text).match('requires property "phone"')
      })
  })

  it('failed!!', () => {
    request(server)
      .post('/v1/login')
      .send({phone: '18585855858', password: 'super1234'})
      .set('Accept', 'application/json')
      .expect(400)
      .then(response => {
        should(response.error.text).match('验证失败')
      })
  })
})
