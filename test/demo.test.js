/**
 * @description 测试用例
 * @description 后缀必须是 .test.js
 */

 function sum(a, b){
   return a + b
 }

test('测试用例描述:10 + 20 = 30',() => {
  const res = sum(10, 20)
  // 期待结果为什么  期待 res 是 30
  // toBe()值类型
  // toEqual()对象
  expect(res).toBe(30) 
})