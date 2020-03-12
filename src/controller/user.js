/**
 * @description user controller
 */

const { getUserInfo, createUser, updateUser } = require("../services/user");
const { SuccessModel, ErrorModel } = require("../model/ResModel");
const {
  registerUserNameExistInfo,
  registerFailInfo,
  registerUserNameNotExistInfo,
  changeInfoFailInfo,
  changePasswordFailInfo
} = require("../model/ErrorInfo");
const doCrypto = require("../utils/crypto");

/**
 * 用户名是否存在
 * @param {string} userName 用户名
 */
async function isExist(userName) {
  const userInfo = await getUserInfo(userName);
  if (userInfo) {
    // { errno: 0, data: {....} }
    return new SuccessModel(userInfo);
  } else {
    // { errno: 10003, message: '用户名未存在' }
    return new ErrorModel(registerUserNameNotExistInfo);
  }
}

/**
 * 注册
 * @param {string} userName 用户名
 * @param {string} password 密码
 * @param {number} gender 性别（1 男，2 女，3 保密）
 */
async function register({ userName, password, gender }) {
  const userInfo = await getUserInfo(userName);
  if (userInfo) {
    // 用户名已存在
    return new ErrorModel(registerUserNameExistInfo);
  }

  try {
    await createUser({
      userName,
      password: doCrypto(password),
      gender
    });
    return new SuccessModel();
  } catch (err) {
    return new ErrorModel(registerFailInfo);
  }
}

/**
 * 登录
 * @param {string} userName 用户名
 * @param {string} password 密码
 */
async function login({ ctx, userName, password }) {
  const userInfo = await getUserInfo(userName, doCrypto(password));
  if (!userInfo) {
    // 用户名不存在
    return new ErrorModel(registerUserNameNotExistInfo);
  }

  // 登录成功
  ctx.session.userInfo = userInfo;
  return new SuccessModel(userInfo);
}

/**
 * 修改个人信息
 * @param {Object} ctx ctx
 * @param {string} nickName 昵称
 * @param {string} city 城市
 * @param {string} picture 头像
 */
async function changeInfo(ctx, { nickName, city, picture }) {
  const { userName } = ctx.session.userInfo;
  if (!nickName) {
    nickName = userName;
  }

  const result = await updateUser(
    {
      newNickName: nickName,
      newCity: city,
      newPicture: picture
    },
    { userName }
  );
  if (result) {
    // 执行成功
    Object.assign(ctx.session.userInfo, {
      nickName,
      city,
      picture
    });
    // 返回
    return new SuccessModel();
  }
  // 失败
  return new ErrorModel(changeInfoFailInfo);
}

/**
 * 修改密码
 * @param {string} userName 用户名
 * @param {string} password 当前密码
 * @param {string} newPassword 新密码
 */
async function changePassword(userName, password, newPassword) {
  const result = await updateUser(
    {
      newPassword: doCrypto(newPassword)
    },
    {
      userName,
      password: doCrypto(password)
    }
  )
  if (result) {
    // 成功
    return new SuccessModel()
  }
  // 失败
  return new ErrorModel(changePasswordFailInfo)
}

/**
 * 退出登录
 * @param {Object} ctx ctx
 */
async function logout(ctx) {
  delete ctx.session.userInfo
  return new SuccessModel()
}

module.exports = {
  isExist,
  register,
  login,
  changeInfo,
  changePassword,
  logout
};
