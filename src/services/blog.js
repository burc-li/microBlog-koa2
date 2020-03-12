/**
 * @description 微博 service
 */

const { Blog, User, UserRelation } = require('../db/model/index')
const { formatUser } = require('./_format')

/**
* 创建微博
* @param {Object} param0 创建微博的数据 { userId, content, image }
*/
async function createBlog({ userId, content, image }) {
  const result = await Blog.create({
    userId,
    content,
    image
  })
  console.log('result.dataValues', result.dataValues)
  return result.dataValues
}

/**
 * 删除微博
 * @param {number} blogId 博客id 
 */
async function delBlog(blogId) {
  const res = await Blog.destroy({
    where: {
      id: blogId
    }
  })

  console.log('res', res)
  return res > 0
}

/**
 * 根据用户获取微博列表
 * @param {Object} param0 查询参数 { userId, pageIndex = 0, pageSize = 10 }
 */
async function getBlogListByUser(
  { userId, pageIndex, pageSize }
) {
  // 拼接查询条件
  const userWhereOpts = {}
  if (userId) {
    userWhereOpts.id = userId
  }

  // 执行查询
  const result = await Blog.findAndCountAll({
    limit: pageSize, // 每页多少条
    offset: pageSize * pageIndex, // 跳过多少条
    order: [
      ['id', 'desc']
    ],
    include: [
      {
        model: User,
        attributes: ['userName', 'nickName', 'picture'],
        where: userWhereOpts
      }
    ]
  })
  // result.count 总数，跟分页无关
  // result.rows 查询结果，数组

  // 获取 dataValues
  let blogList = result.rows.map(row => row.dataValues)

  blogList = blogList.map(blogItem => {
    blogItem.user = formatUser(blogItem.user.dataValues)
    return blogItem
  })

  return {
    count: result.count,
    blogList
  }
}

/**
 * 获取关注用户的微博列表
 * @param {number} pageIndex 
 * @param {number} userId 
 * @param {number} pageSize 
 */
async function getFollowersBlogListByUser(pageIndex, userId, pageSize) {
  // 执行查询
  const result = await Blog.findAndCountAll({
    limit: pageSize, // 每页多少条
    offset: pageSize * pageIndex, // 跳过多少条
    order: [
      ['id', 'desc']
    ],
    include: [
      {
        model: User,
        attributes: ['userName', 'nickName', 'picture']
      }, {
        model: UserRelation,
        attributes: ['userId', 'followerId'],
        where: {
          userId
        }
      }
    ]
  })
  // result.count 总数，跟分页无关
  // result.rows 查询结果，数组

  // 获取 dataValues
  let blogList = result.rows.map(row => row.dataValues)

  blogList = blogList.map(blogItem => {
    blogItem.user = formatUser(blogItem.user.dataValues)
    blogItem.userRelation = blogItem.userRelation.dataValues
    return blogItem
  })

  return {
    count: result.count,
    blogList
  }
}


module.exports = {
  createBlog,
  delBlog,
  getBlogListByUser,
  getFollowersBlogListByUser
}

