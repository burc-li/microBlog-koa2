/**
 * @description 点赞、举报、评论 API 路由
 */

const router = require('koa-router')()
const { loginCheck } = require('../middlewares/loginCheck')
const { likeBlog, complainBlog } = require('../controller/message')

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


module.exports = router
