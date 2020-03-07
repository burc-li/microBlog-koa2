/**
 * @description sequelize实例
 */
const Sequelize = require('sequelize')
const { MYSQL_CONFIG } = require('../config/db')

const { database, user, password } = MYSQL_CONFIG
const config = {
  host: MYSQL_CONFIG.host,  //  接数据库的主机
  port: MYSQL_CONFIG.port, //  接数据库的端口
  protocol: 'tcp',    //  连接数据库使用的协议
  dialect: 'mysql',   //  使用mysql
  pool: {
    max: 5,         //  连接池最大的连接数量
    min: 0,         //  连接池最小的连接数量
    idle: 10000     //  连接空置时间（毫秒），超时后将释放连接
  },
  retry: {        //  设置自动查询时的重试标志
    max: 3          //  设置重试次数
  },
  omitNull: false,    //  null 是否通过SQL语句查询
  timezone: '+08:00'  //  解决时差 - 默认存储时间存在8小时误差
}

/**
 * @param database 数据库名
 * @param user 数据库用户名
 * @param password 数据库连接密码
 */
const seq = new Sequelize(database, user, password, config)

module.exports = seq

