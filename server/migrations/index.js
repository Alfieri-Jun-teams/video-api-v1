const fs = require('fs')
const path = require('path')
const _ = require('lodash')
global.Promise = require('bluebird')
let env = process.argv[2]
if (!env) env = 'default'
const knex = require('knex')
const configPath = path.join(__dirname, '../config', `config.${env}.js`)
let config = require(configPath)

if (typeof config === 'function') config = config({baseDir: '', name: ''})

const knexConfig = {
  client: config.knex.client.dialect,
  connection: config.knex.client.connection
}
const db = knex(knexConfig)

let tasks = []

fs.readdirSync(__dirname).map(file => {
  if (file !== 'index.js') {
    let migrations = require(path.join(__dirname, file))(db)
    const table = file.split('.')[0]
    migrations = migrations.map(migration => {
      if (_.isPlainObject(migration)) {
        return function () {
          return db.schema.hasColumn(table, migration.field).then(exists => {
            if (!exists) {
              return db.schema.table(table, t => {
                if (migration.args && !Array.isArray(migration.args)) migration.args = [migration.args]
                let column = t[migration.type](...[migration.field].concat(migration.args || []))
                if (migration.default) column.defaultTo(migration.default)
                if (migration.comment) column.comment(migration.comment)
                if (migration.after) column.after(migration.after)
              })
            }
          })
        }
      }

      return migration
    })
    tasks = _.union(tasks, migrations)
  }
})

Promise
  .reduce(tasks, (total, task) => Promise.resolve().then(task), 0)
  .then(() => {
    console.log('sync db done!')
    process.exit()
  })
