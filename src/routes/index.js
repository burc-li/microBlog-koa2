const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  if (!ctx.session.viewCount) ctx.session.viewCount = 0
  ctx.session.viewCount++

  ctx.body = {
    viewCount: ctx.session.viewCount,
    data: 'session'
  }
})

module.exports = router
