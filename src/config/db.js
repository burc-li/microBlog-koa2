/**
 * @description 存储配置
 */
const { isProd } = require('../utils/env')
let REDIS_CONFIG = {
  port: 6379,
  host: '127.0.0.1'
}

let MYSQL_CONFIG = {
  database: 'blog_koa2',
  user: 'root',
  password: 'qq14569',
  host: 'localhost',  //  接数据库的主机
  port: '3306',       //  接数据库的端口
}

// 线上环境
if (isProd) {
  REDIS_CONFIG = {
    port: 6379,
    host: '127.0.0.1'
  }
}

module.exports = {
  REDIS_CONFIG,
  MYSQL_CONFIG
}