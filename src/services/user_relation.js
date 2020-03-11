/**
 * @description 用户关系services
 */

const { User, UserRelation } = require('../db/model')
const { formatUser } = require('./_format')
const Sequelize = require('sequelize')

/**
 * 添加关注关系
 * @param {number} userId 用户 id
 * @param {number} followerId 被关注用户 id
 */
async function addFollower(userId, followerId) {
  const result = await UserRelation.create({
    userId,
    followerId
  })
  return result.dataValues
}

/**
* 删除关注关系
* @param {number} userId 用户 id
* @param {number} followerId 被关注用户 id
*/
async function deleteFollower(userId, followerId) {
  const result = await UserRelation.destroy({
    where: {
      userId,
      followerId
    }
  })
  return result > 0
}

/**
 * 获取关注该用户的用户列表，即该用户的粉丝
 * @param {number} followerId 被关注人的 id
 */
async function getUsersByFollower(followerId) {
  const res = await User.findAndCountAll({
    attributes: ['id', 'userName', 'nickName', 'picture'],
    order: [
      ["id", "desc"]
    ],
    include: [
      {
        model: UserRelation,
        where: {
          followerId,
          // userId !== followerId
          userId: {
            [Sequelize.Op.ne]: followerId
          }
        }
      }
    ]
  })

  let fansList = res.rows.map(item => {
    let fanVal = item.dataValues
    fanVal.userRelations = JSON.stringify(item.dataValues.userRelations)
    return fanVal
  })
  // 格式化用户 设置默认头像
  fansList = formatUser(fansList)
  return {
    count: res.count,
    fansList
  }
}

/**
 * 获取该用户关注的用户列表
 * @param {number} userId 用户 id
 */
async function getFollowersByUser(userId) {
  const result = await UserRelation.findAndCountAll({
    order: [
      ['id', 'desc']
    ],
    include: [
      {
        model: User,
        attributes: ['id', 'userName', 'nickName', 'picture']
      }
    ],
    where: {
      userId,
      // followerId !== userId
      followerId: {
        [Sequelize.Op.ne]: userId
      }
    }
  })
  // result.count 总数
  // result.rows 查询结果，数组

  let userList = result.rows.map(item => {
    let userVal = item.dataValues
    userVal.user = formatUser(userVal.user.dataValues)
    return userVal
  })

  return {
    count: result.count,
    userList
  }
}




module.exports = {
  addFollower,
  deleteFollower,
  getUsersByFollower,
  getFollowersByUser
}