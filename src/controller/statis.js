/**
 * @description 性别统计、博客数量统计 controller
 */
const { getSexCount } = require('../services/statis')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { sexStatisFailInfo, blogStatisFailInfo } = require('../model/ErrorInfo')

/**
 * 统计性别数量
 */
async function getStatisSex() {
  try {
    const manCount = await getSexCount(1)
    const womanCount = await getSexCount(2)
    const secretCount = await getSexCount(3)
    return new SuccessModel({
      manCount,
      womanCount,
      secretCount
    })
  } catch (err) {
    return new ErrorModel(sexStatisFailInfo)
  }
}

module.exports = {
  getStatisSex,
}