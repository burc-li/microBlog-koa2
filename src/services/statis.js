/**
 * @description 性别统计、博客数量统计 service
 */

const { User, Blog } = require('../db/model')

//获取用户性别数量
async function getSexCount(genderType) {
  const res = await User.findAndCountAll({
    where: {
      gender: genderType
    }
  })

  return res.count
}

module.exports = {
  getSexCount,
}