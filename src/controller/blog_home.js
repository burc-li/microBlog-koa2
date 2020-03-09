/**
 * @description 首页 controller
 */

const xss = require('xss')
const { createBlog, getBlogListByUser } = require('../services/blog')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { createBlogFailInfo } = require('../model/ErrorInfo')
const { PAGE_SIZE } = require('../config/constant')

/**
* 创建微博
* @param {Object} param0 创建微博所需的数据 { userId, content, image }
*/
async function create({ userId, content, image }) {

  try {
    // 创建微博
    const blog = await createBlog({
      userId,
      content: xss(content),
      image
    })

    // 返回
    return new SuccessModel(blog)
  } catch (ex) {
    console.error(ex.message, ex.stack)
    return new ErrorModel(createBlogFailInfo)
  }
}

/**
 * 获取首页的微博列表
 * @param {number} pageIndex pageIndex
 */
async function getHomeBlogList(pageIndex = 0) {
  const result = await getBlogListByUser({
    pageIndex,
    pageSize: PAGE_SIZE
  })
  const blogList = result.blogList

  // 拼接返回数据
  return new SuccessModel({
    isEmpty: blogList.length === 0,
    blogList,
    pageSize: PAGE_SIZE,
    pageIndex,
    count: result.count
  })
}

module.exports = {
  create,
  getHomeBlogList
}
