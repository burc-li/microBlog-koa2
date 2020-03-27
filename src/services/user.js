/**
 * @description user service
 */

const { User } = require("../db/model/index");
const { formatUser } = require("./_format");
const { addFollower } = require('./user_relation')
const { BRIEF_INTRODUCE } = require('../config/constant')

/**
 * 获取用户信息
 * @param {string} userName 用户名
 * @param {string} password 密码
 */
async function getUserInfo(userName, password) {
  // 查询条件
  const whereOpt = {
    userName
  };
  if (password) {
    Object.assign(whereOpt, { password });
  }

  // 查询
  const result = await User.findOne({
    attributes: ["id", "userName", "briefIntroduce", "picture", "city"],
    where: whereOpt
  });

  if (result == null) {
    // 未找到
    return result;
  }

  // 格式化
  const formatRes = formatUser(result.dataValues);

  return formatRes;
}

/**
 * 创建用户
 * @param {string} userName 用户名
 * @param {string} password 密码
 * @param {number} gender 性别
 * @param {string} briefIntroduce 简介
 */
async function createUser({ email, userName, password, gender = 3, briefIntroduce }) {
  const result = await User.create({
    email,
    userName,
    password,
    briefIntroduce: briefIntroduce ? briefIntroduce : BRIEF_INTRODUCE,
    gender
  });
  const data = result.dataValues;

  // 添加自己关注自己【为了获取关注人微博时也获取自己的微博信息】
  addFollower(data.id, data.id)
  addFollower(data.id, 0)

  return data;
}

/**
 * 更新用户信息
 * @param {Object} param0 要修改的内容 { newPassword, newBriefIntroduce, newPicture, newCity }
 * @param {Object} param1 查询条件 { userName, password }
 */
async function updateUser(
  { newPassword, newBriefIntroduce, newPicture, newCity },
  { userName, password }
) {
  // 拼接修改内容
  const updateData = {};
  if (newPassword) {
    updateData.password = newPassword;
  }
  if (newBriefIntroduce) {
    updateData.briefIntroduce = newBriefIntroduce;
  }
  if (newPicture) {
    updateData.picture = newPicture;
  }
  if (newCity) {
    updateData.city = newCity;
  }

  // 拼接查询条件
  const whereData = {
    userName
  };
  if (password) {
    whereData.password = password;
  }

  // 执行修改
  const result = await User.update(updateData, {
    where: whereData
  });
  return result[0] > 0; // 修改的行数
}

module.exports = {
  getUserInfo,
  createUser,
  updateUser
};
