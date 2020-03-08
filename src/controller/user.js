/**
 * @description user controller
 */

const { getUserInfo, createUser, updateUser } = require("../services/user");
const { SuccessModel, ErrorModel } = require("../model/ResModel");
const {
  registerUserNameExistInfo,
  registerFailInfo,
  registerUserNameNotExistInfo,
  changeInfoFailInfo
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
    return new ErrorModel(registerUserNameExistInfo);
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
  return new SuccessModel();
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

module.exports = {
  isExist,
  register,
  login,
  changeInfo
};
