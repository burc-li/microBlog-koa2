const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')
const koaStatic = require('koa-static')
const path = require('path')
const { REDIS_CONFIG } = require('./config/db')

const { SESSION_SECRET_KEY } = require('./config/secretKeys')

const user = require('./routes/user')
const utils = require('./routes/utils')
const blog = require('./routes/blog')
const userRelation = require('./routes/user_relation')
const message = require('./routes/message')


// error handler 在页面上显示错误信息
onerror(app)

// middlewares 获取post参数中间件
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))

app.use(json())
app.use(logger())
// 将public目录注册为静态化
// 例如访问public/stylesheets/style.css 浏览器输入： http://localhost:3000/stylesheets/style.css
// 例如访问uploadFiles/1.jpg 浏览器输入： http://localhost:3000/1.jpg
app.use(koaStatic(__dirname + '/public'))
app.use(koaStatic(path.join(__dirname, '..', '/uploadFiles')))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// logger 无用  使用app.use(logger())即可打印
// app.use(async (ctx, next) => {
//   const start = new Date()
//   await next()
//   const ms = new Date() - start
//   console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
// })

app.keys = [SESSION_SECRET_KEY] // 设置签名的 Cookie 密钥。
app.use(session({
  key: 'koa:sid', // cookie name 默认是 'koa:sid'  值是redis的key（不带前缀）
  prefix: 'koa:sess:', // redis key的前缀 默认是 'koa:sess:' 
  ttl: 24 * 60 * 60 * 1000, //redis的过期时间 默认为cookie.maxAge
  cookie: {
    path: '/', //生成的cookie在该网站所有目录都可以访问
    httpOnly: true, // cookie只能在 服务端 修改
    maxAge: 24 * 60 * 60 * 1000 //过期时间 单位(ms)
  },
  store: redisStore({
    all: `${REDIS_CONFIG.host}:${REDIS_CONFIG.port}`
  })
}))

// routes
app.use(user.routes(), user.allowedMethods())
app.use(utils.routes(), utils.allowedMethods())
app.use(blog.routes(), blog.allowedMethods())
app.use(userRelation.routes(), userRelation.allowedMethods())
app.use(message.routes(), message.allowedMethods())

// error-handling  打印错误信息
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app
