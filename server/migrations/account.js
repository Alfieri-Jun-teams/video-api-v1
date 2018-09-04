module.exports = knex => {
  return [
    function () {
      return knex.schema.hasTable('account').then(exists => {
        if (!exists) {
          return knex.schema.createTable('account', t => {
            t.increments()
            t.string('first_name').comment('姓')
            t.string('last_name').comment('名')
            t.string('phone', 11).comment('手机号')
            t.string('password').comment('密码')
            t.string('nickname').comment('昵称')
            t.text('avator').comment('头像')
            t.timestamp('created_at').defaultTo(knex.fn.now()).comment('创建时间')
            t.datetime('updated_at').comment('更新时间')
            t.datetime('deleted_at').comment('逻辑删除时间')
            t.comment('用户信息表')
          })
        }
      })
    },
    function () {
      return knex.schema.hasColumn('account', 'role').then(exists => {
        if (!exists) {
          return knex.schema.table('account', t => t.string('role').comment('权限身份').after('avator'))
        }
      })
    }
  ]
}
