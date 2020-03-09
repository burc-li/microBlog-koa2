/**
 * @description 首页 API 路由
 */

const router = require('koa-router')()
const { loginCheck } = require('../middlewares/loginCheck')
const { create, getHomeBlogList } = require('../controller/blog_home')

router.prefix('/api/blog')

// 创建微博
router.post('/create', loginCheck, async (ctx, next) => {
  const { content, image } = ctx.request.body
  // 取别名 将 id 取别名 userId
  const { id: userId } = ctx.session.userInfo
  ctx.body = await create({ userId, content, image })
})

// 获取首页（全部用户）的博客列表
router.get('/list', loginCheck, async (ctx, next) => {
  const { pageIndex } = ctx.query

  ctx.body = await getHomeBlogList(pageIndex)
})


module.exports = router