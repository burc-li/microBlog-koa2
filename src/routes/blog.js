/**
 * @description 首页 API 路由
 */

const router = require('koa-router')()
const { loginCheck } = require('../middlewares/loginCheck')
const { create, del, getBlogList } = require('../controller/blog')

router.prefix('/api/blog')

// 创建微博
router.post('/create', loginCheck, async (ctx, next) => {
  const { content, image } = ctx.request.body
  // 取别名 将 id 取别名 userId
  const { id: userId } = ctx.session.userInfo
  ctx.body = await create({ userId, content, image })
})

// 删除某个的博客
router.delete('/del', loginCheck, async (ctx, next) => {
  const { id: blogId } = ctx.request.body

  ctx.body = await del(blogId)
})

// 获取首页（全部用户）的博客列表
router.get('/list', loginCheck, async (ctx, next) => {
  const { pageIndex } = ctx.query

  ctx.body = await getBlogList(pageIndex)
})

// 获取指定用户的博客列表
router.get('/profile/list', loginCheck, async (ctx, next) => {
  const { userName, pageIndex } = ctx.query

  ctx.body = await getBlogList(pageIndex, userName)
})


module.exports = router