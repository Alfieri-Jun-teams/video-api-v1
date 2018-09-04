module.exports = {
  port: process.env.PORT || 4000,
  knex: {
    client: {
      dialect: 'mysql',
      connection: {
        host: '47.106.84.59',
        user: 'vedio_pro',
        password: 'vedio@2018',
        database: 'vedio_db',
        supportBigNumbers: true,
        charset: 'utf8mb4',
        connectTimeout: 15000
      },
      pool: { min: 2, max: 10 }
    },
    app: true,
    agent: false
  },
  redis: {
    host: '47.106.84.59',
    port: 6379,
    password: 'yangzong'
  }
}
