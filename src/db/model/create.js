const  User  = require('./User');

(async function(){
  // 添加burc数据
  const burc = await User.create({
    userName: 'burc',
    passWord: '123456789',
    nickName: '李柏成',
    gender: 1,
    picture: 'http://616pic.com/sucai/vwxipenmd.html',
    city: '济南'
  })
  const burcId = burc.dataValues.id
  console.log('burc',burc.dataValues)

  // 添加wency数据
  const wency = await User.create({
    userName: '野猪佩奇',
    passWord: '456789123',
    nickName: '佩奇',
    gender: 2,
    picture: 'http://616pic.com/sucai/vwxipenmd.html',
    city: '北京'
  })
  const wencyId = wency.dataValues.id

})()