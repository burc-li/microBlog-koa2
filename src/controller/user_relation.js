/**
 * @description 用户关系 controller
 */

const { getUsersByFollower, addFollower, deleteFollower } = require('../services/user_relation')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { addFollowerFailInfo, deleteFollowerFailInfo } = require('../model/ErrorInfo')

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

/**
 * 关注
 * @param {number} myUserId 当前登录的用户 id
 * @param {number} curUserId 要被关注的用户 id
 */
async function follow(myUserId, curUserId) {
  try {
    await addFollower(myUserId, curUserId)
    return new SuccessModel()
  } catch (ex) {
    return new ErrorModel(addFollowerFailInfo)
  }
}

/**
* 取消关注
* @param {number} myUserId 当前登录的用户 id
* @param {number} curUserId 要被关注的用户 id
*/
async function unFollow(myUserId, curUserId) {
  try {
    await deleteFollower(myUserId, curUserId)
    return new SuccessModel()
  } catch (ex) {
    return new ErrorModel(deleteFollowerFailInfo)
  }
}


module.exports = {
  getFans,
  follow,
  unFollow
}