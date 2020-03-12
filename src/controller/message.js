/**
 * @description 点赞、举报、评论 controller
 */

const { addMessage } = require('../services/message')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { likeBlogFailInfo, complainBlogFailInfo } = require('../model/ErrorInfo')

/**
 * 点赞微博
 * @param {number} userId  做出点赞动作的用户ID
 * @param {number} blogId  被点赞的微博ID
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
 */
async function complainBlog({ userId, blogId, type }) {
  try {
    await addMessage({ userId, blogId, type })
    return new SuccessModel()
  } catch (err) {
    return new ErrorModel(complainBlogFailInfo)
  }
}

module.exports = { likeBlog, complainBlog }