/**
 * @description 用户关系services
 */

const { User, UserRelation } = require('../db/model')
const { formatUser } = require('./_format')

/**
 * 获取关注该用户的用户列表，即该用户的粉丝
 * @param {number} followerId 被关注人的 id
 */
async function getUsersByFollower(followerId) {
  const res = await User.findAndCountAll({
    attributes: ['id', 'userName', 'nickName', 'gender', 'picture', 'city'],
    order: [
      ["id", "desc"]
    ],
    include: [
      {
        model: UserRelation,
        where: {
          followerId
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

module.exports = {
  getUsersByFollower
}