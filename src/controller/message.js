/**
 * @description 点赞、举报、评论 controller
 */

const { addMessage, getMessageByUser, getOldMessageByUser, updateMessageByUser } = require('../services/message')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { likeBlogFailInfo,
  complainBlogFailInfo,
  commentBlogFailInfo,
  messageNoticeFailInfo,
  readMessageNoticeFailInfo
} = require('../model/ErrorInfo')

/**
 * 点赞微博
 * @param {number} userId  做出点赞动作的用户ID
 * @param {number} blogId  被点赞的微博ID
 * @param {number} type  类型【点赞：1； 举报：2； 评论：3】
 */
async function likeBlog({ userId, blogId, type }) {
  try {
    await addMessage({ userId, blogId, type })
    return new SuccessModel()
  } catch (err) {
    return new ErrorModel(likeBlogFailInfo)
  }
}

/**
 * 举报微博
 * @param {number} userId  做出举报动作的用户ID
 * @param {number} blogId  被举报的微博ID
 * @param {number} type  类型【点赞：1； 举报：2； 评论：3】
 */
async function complainBlog({ userId, blogId, type }) {
  try {
    await addMessage({ userId, blogId, type })
    return new SuccessModel()
  } catch (err) {
    return new ErrorModel(complainBlogFailInfo)
  }
}

/**
 * 评论微博
 * @param {number} userId  做出评论动作的用户ID
 * @param {number} blogId  被评论的微博ID
 * @param {number} toUserId  被回复的用户ID
 * @param {number} type  类型【点赞：1； 举报：2； 评论：3】
 */
async function commentBlog({ userId, blogId, toUserId, content, type }) {
  try {
    const res = await addMessage({ userId, blogId, toUserId, content, type })
    return new SuccessModel(res)
  } catch (err) {
    return new ErrorModel(commentBlogFailInfo)
  }
}

/**
 * 通过用户ID获取消息通知（点赞信息、举报信息、评论回复信息）
 * @param {number} userId  用户ID
 */
async function getMessageNotice(userId) {
  try {
    const res = await getMessageByUser(userId)
    return new SuccessModel(res)
  } catch (err) {
    return new ErrorModel(messageNoticeFailInfo)
  }
}
/**
 * 通过用户ID获取已读消息通知（点赞信息、举报信息、评论回复信息）
 * @param {number} userId  用户ID
 */
async function getMessageOldnotice(userId) {
  try {
    const res = await getOldMessageByUser(userId)
    return new SuccessModel(res)
  } catch (err) {
    return new ErrorModel(messageNoticeFailInfo)
  }
}

/**
 * 设置消息已读
 * @param {number} userId  用户ID
 */
async function readMessageNotice(userId) {
  try {
    const res = await updateMessageByUser(userId)
    return new SuccessModel()
  } catch (err) {
    return new ErrorModel(readMessageNoticeFailInfo)
  }
}

module.exports = {
  likeBlog,
  complainBlog,
  commentBlog,
  getMessageNotice,
  readMessageNotice,
  getMessageOldnotice
}