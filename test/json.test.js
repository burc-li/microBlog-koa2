/**
 * @description 测试http请求
 */

 const server = require('./server')

 test('json接口测试用例',async () => {
   const res = await server.get('/json')
   expect(res.body).toEqual({
    viewCount: 1,
    data: 'session'
  })
  expect(res.body.viewCount).toBe(1)
 })