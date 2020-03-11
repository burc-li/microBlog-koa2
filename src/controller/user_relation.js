/**
 * @description 用户关系 controller
 */

const { getUsersByFollower } = require('../services/user_relation')
const { SuccessModel } = require('../model/ResModel')
/**
 * 根据 userid 获取粉丝列表
 * @param {number} userId 用户 id
 */
async function getFans(userId) {
  const { count, fansList } = await getUsersByFollower(userId)
  return new SuccessModel({
    count,
    fansList
  })
}

module.exports = {
  getFans
}