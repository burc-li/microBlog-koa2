/**
 * @description 点赞、举报、评论 service
 */

const { Message } = require('../db/model')

/**
 * 添加点赞、举报、评论 消息数据
 */
async function addMessage({ userId, blogId, type }) {
  let addOptions = {
    userId,
    blogId,
    type,
    isRead: false
  }
  const res = await Message.create(addOptions)
  console.log("Res", res)
  return res.dataValues
}

module.exports = {
  addMessage
}