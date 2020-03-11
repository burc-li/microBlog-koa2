/**
 * @description 用户关注关系数据模型
 */

const seq = require('../seq')
const { INTEGER } = require('../types')

const UserRelation = seq.define('userRelation', {
  // 自动创建id，并设置为主键，自增
  userId: {
    type: INTEGER,
    allowNull: false,
    comment: '用户 id'
  },
  followerId: {
    type: INTEGER,
    allowNull: false,
    comment: '被关注用户的 id'
  }
  // 自动创建createAt 和 updateAt
})

module.exports = UserRelation
