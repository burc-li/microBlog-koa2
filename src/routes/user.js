/**
 * @description user API 路由
 */

const router = require('koa-router')()
const { isExist, register, login, changeInfo, changePassword, logout } = require('../controller/user')
const { loginCheck } = require('../middlewares/loginCheck')

router.prefix('/api/user')

// 用户名是否存在
router.post('/isExist', async (ctx, next) => {
  const { userName } = ctx.request.body
  ctx.body = await isExist(userName)
})

// 注册API
router.post('/register', async (ctx, next) => {
  const { userName, password, gender } = ctx.request.body
  ctx.body = await register({
    userName,
    password,
    gender
  })
})

// 登录API
router.post('/login', async (ctx, next) => {
  const { userName, password } = ctx.request.body
  ctx.body = await login({
    ctx,
    userName,
    password,
  })
})

// 修改个人信息
router.patch('/changeInfo', loginCheck, async (ctx, next) => {
  const { nickName, city, picture } = ctx.request.body
  ctx.body = await changeInfo(ctx, { nickName, city, picture })
})

// 修改密码
router.patch('/changePassword', loginCheck, async (ctx, next) => {
  const { password, newPassword } = ctx.request.body
  const { userName } = ctx.session.userInfo
  ctx.body = await changePassword(userName, password, newPassword)
})

// 退出登录
router.post('/logout', loginCheck, async (ctx, next) => {
  ctx.body = await logout(ctx)
})

module.exports = router
