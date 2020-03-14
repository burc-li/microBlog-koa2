/**
 * @description 点赞、举报、评论 API 路由
 */

const router = require('koa-router')()
const { loginCheck } = require('../middlewares/loginCheck')
const { likeBlog,
  complainBlog,
  commentBlog,
  getMessageNotice,
  readMessageNotice
} = require('../controller/message')

router.prefix('/api/message')

// 点赞微博
router.post('/like', loginCheck, async (ctx, next) => {
  const { userId, blogId } = ctx.request.body
  ctx.body = await likeBlog({ userId, blogId, type: 1 })
})

// 举报微博
router.post('/complain', loginCheck, async (ctx, next) => {
  const { userId, blogId } = ctx.request.body
  ctx.body = await complainBlog({ userId, blogId, type: 2 })
})

// 评论微博
router.post('/comment', loginCheck, async (ctx, next) => {
  const { userId, blogId, toUserId, content } = ctx.request.body
  ctx.body = await commentBlog({ userId, blogId, toUserId, content, type: 3 })
})

// 通过用户ID获取消息通知（点赞信息、举报信息、评论回复信息）
router.get('/notice', loginCheck, async (ctx, next) => {
  const { userId } = ctx.query

  ctx.body = await getMessageNotice(userId)
})

// 已读
router.post('/read', loginCheck, async (ctx, next) => {
  const { userId } = ctx.request.body

  ctx.body = await readMessageNotice(userId)
})



module.exports = router
