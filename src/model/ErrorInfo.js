/**
 * @description 失败信息集合，包括 error 和 message
 */

module.exports = {
  // 用户名已存在
  registerUserNameExistInfo: {
    error: 10001,
    message: '用户名已存在'
  },
  // 注册失败
  registerFailInfo: {
    error: 10002,
    message: '注册失败，请重试'
  },
  // 用户名不存在
  registerUserNameNotExistInfo: {
    error: 10003,
    message: '用户名未存在'
  },
  // 登录失败
  loginFailInfo: {
    error: 10004,
    message: '登录失败，用户名或密码错误'
  },
  // 未登录
  loginCheckFailInfo: {
    error: 10005,
    message: '您尚未登录'
  },
  // 修改密码失败
  changePasswordFailInfo: {
    error: 10006,
    message: '修改密码失败，请重试'
  },
  // 上传文件过大
  uploadFileSizeFailInfo: {
    error: 10007,
    message: '上传文件尺寸过大'
  },
  // 修改基本信息失败
  changeInfoFailInfo: {
    error: 10008,
    message: '修改基本信息失败'
  },
  // json schema 校验失败
  jsonSchemaFileInfo: {
    error: 10009,
    message: '数据格式校验错误'
  },
  // 删除用户失败
  deleteUserFailInfo: {
    error: 10010,
    message: '删除用户失败'
  },
  // 添加关注失败
  addFollowerFailInfo: {
    error: 10011,
    message: '添加关注失败'
  },
  // 取消关注失败
  deleteFollowerFailInfo: {
    error: 10012,
    message: '取消关注失败'
  },
  // 创建微博失败
  createBlogFailInfo: {
    error: 11001,
    message: '创建微博失败，请重试'
  },
  // 删除微博失败
  deleteBlogFailInfo: {
    error: 11002,
    message: '删除微博失败，请重试'
  },
  // 点赞失败
  likeBlogFailInfo: {
    error: 11003,
    message: '点赞失败，请重试'
  },
  // 举报失败
  complainBlogFailInfo: {
    error: 11004,
    message: '举报失败，请重试'
  },
  // 评论失败
  commentBlogFailInfo: {
    error: 11005,
    message: '评论失败，请重试'
  },
  // 获取消息通知失败
  messageNoticeFailInfo: {
    error: 11006,
    message: '获取消息通知失败，请刷新'
  },
  // 设置已读消息通知失败
  messageNoticeFailInfo: {
    error: 11007,
    message: '设置已读消息通知失败，请刷新'
  },
}
