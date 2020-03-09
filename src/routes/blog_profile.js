/**
 * @description 个人主页 API 路由
 */

const router = require('koa-router')()
const { loginCheck } = require('../middlewares/loginCheck')
const { getProfileBlogList } = require('../controller/blog_profile')

router.prefix('/api/blog/profile')

// 获取指定用户的博客列表
router.get('/list', loginCheck, async (ctx, next) => {
  const { userName, pageIndex } = ctx.query

  ctx.body = await getProfileBlogList(userName, pageIndex)
})

module.exports = router
