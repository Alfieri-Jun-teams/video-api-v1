# joi swagger three

[![Build Status][travis-image]][travis-url]
[![codecov][codecov-image]][codecov-url]
[![Dependency Status][daviddm-image]][daviddm-url]
### model

#### props
```javascript
const props = {
	id: Joi.number().integer().description('id'),
	tag_name: Joi.string().description('标签名称'),
	description: Joi.string().description('标签描述')
}
```

#### schema
```javascript
schema: Joi.object().items(props).description('标签信息表')
```

#### index
```javascript
index: {
	path: '/tags',
	method: 'get',
	tags: ['tag'],
	summary: "获取标签信息列表",
	query: _.pick(props, ['tag_name']),
	output: Joi.array().items(props).description('返回信息')
}
```
	
#### create
```javascript
create: {
	path: '/tags',
	method: 'post',
	tags: ['tag'],
	summary: '创建标签信息',
	requestBody: {
		body: _.pick(props, ['tag_name', 'description']),
		required: ['tag_name']
	}
}
```

#### show
```javascript
update: {
	path: '/tags/{id}',
	method: 'get',
	tags: ['tag'],
	summary: '获取标签信息',
	params: _.pick(props, ['id'])
}
```
	
#### update
```javascript
update: {
	path: '/tags/{id}',
	method: 'put',
	tags: ['tag'],
	summary: '更新标签信息',
	params: _.pick(props, ['id'])
}
```

#### destroy
```javascript
update: {
	path: '/tags/{id}',
	method: 'delete',
	tags: ['tag'],
	summary: '删除标签信息',
	params: _.pick(props, ['id'])
}
```

[travis-image]: https://travis-ci.org/Alfieri-Jun-teams/koa_joi_swagger.svg?branch=master
[travis-url]: https://travis-ci.org/Alfieri-Jun-teams/koa_joi_swagger
[codecov-image]: https://codecov.io/gh/Alfieri-Jun-teams/koa_joi_swagger/branch/master/graph/badge.svg
[codecov-url]: https://codecov.io/gh/Alfieri-Jun-teams/koa_joi_swagger
[daviddm-image]: https://david-dm.org/Alfieri-Jun-teams/koa_joi_swagger.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/Alfieri-Jun-teams/koa_joi_swagger