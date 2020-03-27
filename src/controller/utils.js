/**
 * @description utils controller
 */

const fs = require('fs')
const path = require('path')
const { UPLOAD_MAX_SIZE } = require('../config/constant')
const { uploadFileSizeFailInfo } = require('../model/ErrorInfo')
const { ErrorModel, SuccessModel } = require('../model/ResModel')
const doCrypto = require('../utils/crypto')

/**
 * 重命名文件
 * 前端限制上传文件大小 20MB
 * @param {Object} ctx ctx 
 * @param {string} name 文件名 
 * @param {string} type 文件类型 
 * @param {number} size 文件体积大小 
 * @param {string} filePath 文件路径 
 */
async function renameFile(ctx, { name, type, size, filePath }) {

  const userName = ctx.session.userInfo.userName

  // 防止文件名称相同
  const fileName = doCrypto(userName + Date.now()) + '_' + name

  const fileNewPath = path.join(__dirname, '..', '..', '/uploadFiles', fileName)

  fs.rename(filePath, fileNewPath, err => { })

  return new SuccessModel({
    url: '/' + fileName
  })
}

module.exports = {
  renameFile
}