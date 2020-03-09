/**
 * @description 首页 API 路由
 */

const router = require('koa-router')()
const { loginCheck } = require('../middlewares/loginCheck')
const { create } = require('../controller/blog_home')

router.prefix('/api/blog')

// 创建微博
router.post('/create', loginCheck,  async (ctx, next) => {
  const { content, image } = ctx.request.body
  // 取别名 将 id 取别名 userId
  const { id: userId } = ctx.session.userInfo
  ctx.body = await create({ userId, content, image })
})


module.exports = router