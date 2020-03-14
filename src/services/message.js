/**
 * @description 点赞、举报、评论 service
 */

const { Message, User } = require('../db/model')

/**
 * 添加点赞、举报、评论回复 消息数据
 */
async function addMessage({ userId, blogId, toUserId, content, type }) {
  let addOptions = {
    userId,
    blogId,
    type,
    isRead: false
  }
  if (toUserId) {
    const userInfo = await User.findOne({
      where: { id: toUserId }
    })
    const { userName, picture } = userInfo.dataValues
    Object.assign(addOptions, { toUserId, toUserName: userName, toUserPic: picture })
  }

  if (content)
    Object.assign(addOptions, { content })
  const res = await Message.create(addOptions)
  return res.dataValues
}

module.exports = {
  addMessage
}