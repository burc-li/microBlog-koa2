/**
 * @description 点赞、举报、评论 service
 */

const { Message, User, Blog } = require('../db/model')
const { formatUser } = require('../services/_format')

// 获取用户写的所有博客中的点赞信息、举报信息、评论回复信息
async function getMessage(userId) {
  const res = await Message.findAndCountAll({
    order: [
      ['id', 'desc']
    ],
    where: {
      isRead: false
    },
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

  return messageList
}

// 获取回复该用户的回复信息
async function getMessageReply(userId) {
  const resByReply = await Message.findAndCountAll({
    where: {
      toUserId: userId,
      isRead: false
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
  return messageListByReply
}


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
  let messageList = await getMessage(userId)


  // 获取回复该用户的回复信息
  let messageListByReply = await getMessageReply(userId)

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


/**
 * 修改 messages 数据表的 isRead 属性为 true
 */
async function updateMessageByUser(userId) {
  const { messageList } = await getMessageByUser(userId)
  const updateIdArr = messageList.map(item => item.id)

  const res = await Message.update({
    isRead: true
  }, {
    where: {
      id: updateIdArr
    }
  })
  return res[0] > 0
}

module.exports = {
  addMessage,
  getMessageByUser,
  updateMessageByUser
}