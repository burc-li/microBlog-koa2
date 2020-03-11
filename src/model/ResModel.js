/**
 * @description res 的数据模型
 */

/**
 * 基础模块
 */
class BaseModel {
  constructor({ error, data, message }) {
    if (error) {
      this.error = error
    }
    if (data) {
      this.data = data
    }
    if (message) {
      this.message = message
    }
  }
}

/**
 * 成功的数据模型
 */
class SuccessModel extends BaseModel {
  constructor(data = {}) {
    super({
      data
    })
    this.success = true
  }
}

/**
 * 失败的数据模型
 */
class ErrorModel extends BaseModel {
  constructor({ error, message }) {
    super({
      error,
      message
    })
    this.success = false
  }
}

module.exports = {
  SuccessModel,
  ErrorModel
}
