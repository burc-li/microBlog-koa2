/**
 * @description 点赞、举报、评论消息数据
 */

const seq = require('../seq')
const { INTEGER, BOOLEAN } = require('../types')

const Message = seq.define('message', {
  // 自动创建id，并设置为主键，自增
  userId: {
    type: INTEGER,
    allowNull: false,
    comment: '做出动作的 用户ID'
  },
  toUserId: {
    type: INTEGER,
    comment: '被回复的 用户ID（评论被回复的用户，点赞举报都为NULL）'
  },
  blogId: {
    type: INTEGER,
    allowNull: false,
    comment: '博客ID（哪一篇博客下面的点赞、举报、评论）'
  },
  isRead: {
    type: BOOLEAN,
    allowNull: false,
    comment: '消息是否已读'
  },
  type: {
    type: INTEGER,
    allowNull: false,
    comment: '类型 【点赞: 1; 举报: 2; 评论: 3 】'
  }
  // 自动创建createAt 和 updateAt
})

module.exports = Message
