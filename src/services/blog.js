/**
 * @description 微博 service
 */

const { Blog, User, UserRelation, Message } = require('../db/model/index')
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
        attributes: ['id', 'userName', 'briefIntroduce', 'picture'],
        where: userWhereOpts
      },
      {
        model: Message,
        attributes: ['id', 'type'],
      }
    ]
  })
  // result.count 总数，跟分页无关
  // result.rows 查询结果，数组

  // 获取 dataValues
  let blogList = result.rows.map(row => row.dataValues)

  blogList = blogList.map(blogItem => {
    blogItem.user = formatUser(blogItem.user.dataValues)
    blogItem.likeCount = blogItem.messages.filter(item =>
      item.type === 1
    ).length
    blogItem.commentCount = blogItem.messages.filter(item =>
      item.type === 3
    ).length

    delete blogItem.messages
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
        attributes: ['id', 'userName', 'briefIntroduce', 'picture']
      }, {
        model: UserRelation,
        attributes: ['userId', 'followerId'],
        where: {
          userId
        }
      },
      {
        model: Message,
        attributes: ['id', 'type'],
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
    blogItem.likeCount = blogItem.messages.filter(item =>
      item.type === 1
    ).length
    blogItem.commentCount = blogItem.messages.filter(item =>
      item.type === 3
    ).length

    delete blogItem.messages
    return blogItem
  })

  return {
    count: result.count,
    blogList
  }
}

/**
 * 通过博客id获取博客详细信息（内容、点赞信息、举报信息、评论回复信息）
 * @param {number} blogId 
 */
async function getBlogDetailByBlogId(blogId) {
  // 执行查询
  const res = await Blog.findOne({
    where: {
      id: blogId
    },
    include: [
      {
        model: Message,

      },

      {
        model: User,
        attributes: ['id', 'userName', 'briefIntroduce', 'picture']
      }

    ]
  })
  let detail = res.dataValues
  detail.messages = detail.messages.map(item => {
    item.dataValues.toUserId ? item.dataValues = formatUser(item.dataValues) : ''
    item.dataValues.user = formatUser(item.dataValues.user)
    return item.dataValues
  })

  detail.likeCount = detail.messages.filter(item =>
    item.type === 1
  ).length
  detail.complainCount = detail.messages.filter(item =>
    item.type === 2
  ).length
  detail.comment = detail.messages.filter(item =>
    item.type === 3
  )
  detail.comment.sort((a, b) =>
    a.id > b.id
  )
  delete detail.messages

  return { detail }
}


module.exports = {
  createBlog,
  delBlog,
  getBlogListByUser,
  getFollowersBlogListByUser,
  getBlogDetailByBlogId
}

