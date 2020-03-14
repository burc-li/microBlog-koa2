/**
 * @description 点赞、举报、评论 service
 */

const { Message, User, Blog } = require('../db/model')
const { formatUser } = require('../services/_format')

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

/**
 * 通过用户ID获取消息通知（点赞信息、举报信息、评论回复信息）
 */
async function getMessageByUser(userId) {
  // 获取用户写的所有博客中的点赞信息、举报信息、评论回复信息
  const res = await Message.findAndCountAll({
    order: [
      ['id', 'desc']
    ],
    include: [
      {
        model: Blog,
        where: {
          userId
        }
      }, {
        model: User,
        attributes: ['id', 'userName', 'nickName', 'picture']
      }
    ]
  })

  // 获取 dataValues
  let messageList = res.rows.map(row => {
    const messageRow = row.dataValues
    messageRow.blog = messageRow.blog.dataValues
    messageRow.user = formatUser(messageRow.user.dataValues)
    return messageRow
  })

  // 获取回复该用户的回复信息
  const resByReply = await Message.findAndCountAll({
    where: {
      toUserId: userId
    },
    include: [
      {
        model: User,
        attributes: ['id', 'userName', 'nickName', 'picture']
      }, {
        model: Blog,
      }
    ]
  })

  // 获取 dataValues
  let messageListByReply = resByReply.rows.map(row => {
    const messageRow = row.dataValues
    messageRow.toUserId ? row.dataValues = formatUser(row.dataValues) : ''
    messageRow.blog = messageRow.blog.dataValues
    messageRow.user = formatUser(messageRow.user.dataValues)
    return messageRow
  })

  // 把这两个消息列表组合，去重
  messageListByReply.map(rowByReply => {
    const isExit = messageList.some(row => rowByReply.id === row.id)
    if (!isExit)
      messageList.push(rowByReply)
  })
  // 重排序
  messageList.sort((a, b) => a.id < b.id)

  return {
    messageList: messageList,
    count: messageList.length
  }
}

module.exports = {
  addMessage,
  getMessageByUser
}