/**
 * @description 性别统计、博客数量统计 service
 */

const { User, Blog } = require('../db/model')
const Sequelize = require('sequelize')

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
  const res = await Blog.findAndCountAll({
    attributes: ['id', 'createdAt'],
    where: {
      id: {
        [Sequelize.Op.gt]: 0,
      },
    }
  })

  console.log("res", res)

  const blogList = res.rows.map(item => item.dataValues)

  return { blogList }
}

module.exports = {
  getSexCount,
  getBlogCountOfDay
}