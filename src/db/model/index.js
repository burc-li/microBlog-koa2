/**
 * @description 数据模型入口文件
 */

const User = require('./User')
const Blog = require('./Blog')

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

module.exports = {
  User,
  Blog
}