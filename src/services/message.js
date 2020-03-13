/**
 * @description 点赞、举报、评论 service
 */

const { Message } = require('../db/model')

/**
 * 添加点赞、举报、评论 消息数据
 */
async function addMessage({ userId, blogId, toUserId, type }) {
  let addOptions = {
    userId,
    blogId,
    type,
    isRead: false
  }
  if (toUserId)
    Object.assign(addOptions, { toUserId })
  const res = await Message.create(addOptions)
  return res.dataValues
}

module.exports = {
  addMessage
}