/**
 * @description 用户关系 API 路由
 */

const router = require('koa-router')()
const { loginCheck } = require('../middlewares/loginCheck')
const { getFans, follow, unFollow } = require('../controller/user_relation')

router.prefix('/api/relation')

// 获取粉丝列表API
router.get('/fans', loginCheck, async (ctx, next) => {
  const { userId } = ctx.query

  ctx.body = await getFans(userId)
})

// 关注
router.post('/follow', loginCheck, async (ctx, next) => {
  const { id: myUserId } = ctx.session.userInfo
  const { userId: curUserId } = ctx.request.body
  ctx.body = await follow(myUserId, curUserId)
})

// 取消关注
router.delete('/unFollow', loginCheck, async (ctx, next) => {
  const { id: myUserId } = ctx.session.userInfo
  const { userId: curUserId } = ctx.request.body
  ctx.body = await unFollow(myUserId, curUserId)
})

module.exports = router