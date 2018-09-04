module.exports = knex => {
  return [
    function () {
      return knex.schema.hasTable('video_list').then(exists => {
        if (!exists) {
          return knex.schema.createTable('video_list', t => {
            t.increments()
            t.string('url').comment('video_url')
            t.string('name').comment('video_name')
            t.integer('reply').comment('评论数目')
            t.integer('favorite').comment('收藏数目')
            t.integer('share').comment('分享数目')
            t.string('tags').comment('标签——数组')
            t.timestamp('created_at').defaultTo(knex.fn.now()).comment('创建时间')
            t.datetime('updated_at').comment('更新时间')
            t.datetime('deleted_at').comment('逻辑删除时间')
            t.comment('video信息表')
          })
        }
      })
    }
  ]
}
