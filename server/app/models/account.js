const Joi = require('joi')
const _ = require('lodash')

const props = {
  id: Joi.number().integer().description('id'),
  first_name: Joi.string().description('姓'),
  last_name: Joi.string().description('名'),
  phone: Joi.string().regex(/^[0-9]{11}$/, 'phone').description('手机号'),
  password: Joi.string().description('密码'),
  nickname: Joi.string().description('昵称'),
  avator: Joi.string().description('头像'),
  role: Joi.string().valid('admin', 'users').invalid('').description('权限'),
  created_at: Joi.date().description('创建时间'),
  updated_at: Joi.date().description('更新时间'),
  deleted_at: Joi.date().description('逻辑删除时间')
}

const schema = Joi.object().keys(props).description('账号信息表')

module.exports = {
  schema,
  login: {
    path: '/login',
    method: 'post',
    tags: ['account'],
    summary: '登录',
    requestBody: {
      body: _.pick(props, ['phone', 'password']),
      required: ['phone', 'password']
    }
  },
  index: {
    path: '/accounts',
    method: 'get',
    tags: ['account'],
    summary: '获取所有用户信息',
    query: _.pick(props, ['nickname', 'phone', 'role']),
    output: Joi.array().items(props).description('获取所有用户信息')
  },
  show: {
    path: '/accounts/:id',
    method: 'get',
    tags: ['account'],
    summary: '用户详情',
    params: _.pick(props, ['id'])
  },
  update: {
    path: '/accounts/:id',
    method: 'put',
    tags: ['account'],
    summary: '更新用户信息',
    params: _.pick(props, ['id']),
    requestBody: {
      body: _.pick(props, ['nickname', 'first_name', 'last_name', 'avator'])
    }
  },
  destroy: {
    path: '/accounts/:id',
    method: 'delete',
    tags: ['account'],
    summary: '删除用户信息',
    params: _.pick(props, ['id'])
  }
}
