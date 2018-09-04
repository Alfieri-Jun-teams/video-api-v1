const config = require('../config')
const data = require('./data')
const knex = require('knex')({
  client: config.knex.client.dialect,
  connection: config.knex.client.connection
})
const promisify = (fn) => new Promise((resolve, reject) => fn(resolve))

const seed = async () => {
  const url = 'https://www.bilibili.com/video/av7248433'
  const video = await knex('video_list').where('url', url).whereNull('deleted_at').first()
  if (video) {
    console.log('----------->', '数据已存在')
  } else {
    const trx = await promisify(knex.transaction)
    try {
      let i = 0
      let item = {}
      while (i < data.length) {
        item.url = data[i].v_href || ''
        item.name = data[i].v_name || 'video'
        item.reply = data[i].v_reply || 0
        item.favorite = data[i].v_favorite || 0
        item.share = data[i].v_share || 0
        console.log('--------->', item)
        await trx('video_list').insert(item)
        i++
      }
      await trx.commit()
      console.log('--------->', 'done')
    } catch (err) {
      await trx.rollback(new Error('Something went wrong'))
    }
  }
}

seed()
