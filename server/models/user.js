const Joi = require('joi')
const _ = require('lodash')

const props = {
  id: Joi.number().integer().description('id'),
  phone: Joi.string().description('手机号'),
  password: Joi.string().description('密码')
}

const schema = Joi.object().keys(props).description('用户信息表')

module.exports = {
  schema,
  index: {
    path: '/users',
    method: 'get',
    tags: ['users'],
    summary: '获取用户列表',
    query: _.pick(props, ['phone']),
    output: Joi.array().items(props).description('返回列表查询')
  },
  create: {
    path: '/users',
    method: 'post',
    tags: ['users'],
    summary: '创建用户',
    requestBody: {
      body: _.pick(props, ['phone', 'password']),
      required: ['phone', 'password']
    }
  },
  show: {
    path: '/users/:id',
    method: 'get',
    tags: ['users'],
    summary: '获取用户详情',
    params: _.pick(props, ['id']),
    header: {
      x_access_token: Joi.string().description('token')
    }
  },
  update: {
    path: '/users/{id}',
    method: 'put',
    tags: ['users'],
    summary: '更新用户信息',
    params: _.pick(props, ['id']),
    requestBody: {
      body: _.pick(props, ['phone'])
    }
  },
  destroy: {
    path: '/users/:id',
    method: 'delete',
    tags: ['users'],
    summary: '删除用户详情',
    params: _.pick(props, ['id'])
  }
}
