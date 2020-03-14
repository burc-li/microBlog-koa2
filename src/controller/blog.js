/**
 * @description 首页 controller
 */

const xss = require('xss')
const { createBlog, delBlog, getBlogListByUser, getFollowersBlogListByUser, getBlogDetailByBlogId } = require('../services/blog')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { createBlogFailInfo, deleteBlogFailInfo } = require('../model/ErrorInfo')
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
 * 根据博客 id 删除博客
 * @param {number} blogId 
 */
async function del(blogId) {
  const res = await delBlog(blogId)
  if (res)
    return new SuccessModel()
  return new ErrorModel(deleteBlogFailInfo)
}

/**
 * 获取微博列表  若有userName则是指定用户
 * 获取微博列表  若没有userName则是全部用户
 * @param {number} pageIndex 当前页码
 * @param {string} userName 用户名
 */
async function getBlogList(pageIndex = 0, userId) {
  let queryObj = { pageIndex, pageSize: PAGE_SIZE }
  if (userId)
    Object.assign(queryObj, { userId })
  const result = await getBlogListByUser(queryObj)
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

/**
 * 获取关注用户的微博列表 三表查询
 * @param {number} pageIndex 
 * @param {number} userId 
 */
async function getFollowersBlogList(pageIndex = 0, userId) {
  const result = await getFollowersBlogListByUser(pageIndex, userId, PAGE_SIZE)
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

/**
 * 通过博客id获取博客详细信息（内容、点赞信息、举报信息、评论回复信息）
 * @param {number} blogId 
 */
async function getBlogDetail(blogId) {
  let detail = await getBlogDetailByBlogId(blogId)

  return new SuccessModel(detail)
}

module.exports = {
  create,
  del,
  getBlogList,
  getFollowersBlogList,
  getBlogDetail
}
