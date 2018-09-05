const Joi = require('joi')
const _ = require('lodash')

const props = {
  id: Joi.number().integer().description('id'),
  url: Joi.string().description('url'),
  name: Joi.string().description('name'),
  reply: Joi.number().integer().description('评论数目'),
  favorite: Joi.number().integer().description('收藏数目'),
  share: Joi.number().integer().description('分享数目'),
  tags: Joi.array().items(Joi.string().description('标签')).description('标签组'),
  created_at: Joi.date().description('创建时间'),
  updated_at: Joi.date().description('更新时间'),
  deleted_at: Joi.date().description('删除时间')
}

const schema = Joi.object().keys(props).description('vedio信息表')

module.exports = {
  schema,
  index: {
    path: '/videos',
    method: 'get',
    tags: ['video'],
    summary: '获取视频列表',
    query: Object.assign(
      _.pick(props, ['name']), {
        tag: Joi.string().description('标签')
      }
    ),
    output: Joi.array().items(props).description('返回列表查询')
  },
  create: {
    path: '/videos',
    method: 'post',
    tags: ['video'],
    summary: '创建视频信息',
    requestBody: {
      body: _.pick(props, ['url', 'name', 'tags']),
      required: ['url', 'name']
    }
  },
  show: {
    path: '/videos/:id',
    method: 'get',
    tags: ['video'],
    summary: '获取用户详情',
    params: _.pick(props, ['id'])
  },
  update: {
    path: '/videos/{id}',
    method: 'put',
    tags: ['video'],
    summary: '更新视频信息',
    params: _.pick(props, ['id']),
    requestBody: {
      body: _.pick(props, ['name', 'tags'])
    }
  },
  destroy: {
    path: '/videos/:id',
    method: 'delete',
    tags: ['video'],
    summary: '删除视频详情',
    params: _.pick(props, ['id'])
  }
}
