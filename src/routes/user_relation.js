/**
 * @description 用户关系 API 路由
 */

const router = require('koa-router')()
const { loginCheck } = require('../middlewares/loginCheck')
const { getFans } = require('../controller/user_relation')

router.prefix('/api/relation')

// 我关注了哪些用户
router.get('/follow', loginCheck, async (ctx, next) => {
  const { userId } = ctx.query

  ctx.body = await getFans(userId)
})

module.exports = router