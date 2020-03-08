/**
 * @description 工具 API 路由
 */

const router = require('koa-router')()
const koaBody = require('koa-body')
const path = require('path')
const { loginCheck } = require('../middlewares/loginCheck')
const { renameFile } = require('../controller/utils')
const { UPLOAD_MAX_SIZE } = require('../config/constant')

//文件上传配置
const koaBodyConfig = {
  multipart: true, // 支持文件上传
  formidable: {
    uploadDir:path.join(__dirname,'..','..','/uploadFiles'), // 设置文件上传目录
    maxFileSize: UPLOAD_MAX_SIZE, //上传文件大小 20MB
    keepExtensions: true //  保存图片的后缀
  }
}

router.prefix('/api/utils')

// 上传文件
router.post('/upload', loginCheck, koaBody(koaBodyConfig), async (ctx) => {
  const { size, path, name, type } = ctx.request.files['']
  ctx.body = await renameFile(ctx,{
    name,
    type,
    size,
    filePath: path
  })
})


module.exports = router
