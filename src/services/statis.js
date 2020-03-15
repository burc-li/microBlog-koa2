/**
 * @description 性别统计、博客数量统计 service
 */

const { User, Blog } = require('../db/model')
const Sequelize = require('sequelize')
const seq = require('../db/seq')

//获取用户性别数量
async function getSexCount(genderType) {
  const res = await User.findAndCountAll({
    attributes: ['id', 'userName', 'gender'],
    where: {
      gender: genderType
    }
  })

  return res.count
}

//统计每天的博客数量
async function getBlogCountOfDay() {
  const res = await seq.query("SELECT FROM_UNIXTIME(unix_timestamp(createdAt), '%Y年%m月%d日') as createdAt, count(id) as count FROM blogs where 1 = 1 group by FROM_UNIXTIME(unix_timestamp(createdAt), '%Y年%m月%d')");

  return { blogStatis: res[0] }
}

module.exports = {
  getSexCount,
  getBlogCountOfDay
}