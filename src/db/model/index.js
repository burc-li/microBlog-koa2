/**
 * @description 数据模型入口文件
 */

const User = require('./User')
const Blog = require('./Blog')
const UserRelation = require('./UserRelation')

// 外键添加在父关联对象中 Blog
// 创建当前模型（源）到目标模型之间的关系，外键会被添加到源模型中。
Blog.belongsTo(User, {
  foreignKey: 'userId'
})

// 外键添加在子关联对象中 Blog
// 创建当前模型（源）到目标模型之间的 1:m 的关系，外键会被添加到目标模型中。
User.hasMany(Blog, {
  foreignKey: 'userId'
})

UserRelation.belongsTo(User, {
  foreignKey: 'followerId'
})

// 获取关注该用户的用户列表，即该用户的粉丝
/**
 * 用户1信息  userId1  followerId6  
 * 用户2信息  userId2  followerId6  
 * 用户3信息  userId3  followerId6  
 */
User.hasMany(UserRelation, {
  foreignKey: 'userId'
})

module.exports = {
  User,
  Blog,
  UserRelation
}