/**
 * @description 用户关系 API 路由
 */

const router = require('koa-router')()
const { loginCheck } = require('../middlewares/loginCheck')
const { getFans } = require('../controller/user_relation')

router.prefix('/api/relation')

// 获取粉丝列表API
router.get('/fans', loginCheck, async (ctx, next) => {
  const { userId } = ctx.query

  ctx.body = await getFans(userId)
})

module.exports = router