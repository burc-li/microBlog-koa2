/**
 * @description 性别统计、博客数量统计 API 路由
 */

const router = require('koa-router')()
const { loginCheck } = require('../middlewares/loginCheck')
const { getStatisSex, getStatisBlog } = require('../controller/statis')

router.prefix('/api/statis')

//统计性别数量
router.get('/sex', loginCheck, async (ctx, next) => {
  ctx.body = await getStatisSex()
})

//统计每天的博客数量
router.get('/blog', loginCheck, async (ctx, next) => {
  ctx.body = await getStatisBlog()
})

module.exports = router