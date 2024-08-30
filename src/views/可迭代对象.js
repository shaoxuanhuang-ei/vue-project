// 法1：借用数组的可迭代属性
Object.prototype[Symbol.iterator] = function () {
  return Object.values(this)[Symbol.iterator]()
}
// 法2：通过生成器
// Object.prototype[Symbol.iterator] = function* () {
//   yield Object.values(this)
// }
// var [a, b] = {
//   a: 1,
//   b: 2
// }
// console.log(a, b)

// function keyboardMap(str) {
//   const map = ['', '', 'abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz']
//   let result = []
//   for (let i = 0; i < str.length; i++) {
//     result = compose(result, map[str[i]])
//   }
//   return result
// }

// function compose(arr1, arr2) {
//   let res = []
//   if (arr1.length === 0) return arr2
//   if (arr2.length === 0) return arr1
//   for (let i = 0; i < arr1.length; i++) {
//     for (let j = 0; j < arr2.length; j++) {
//       res.push(arr1[i] + arr2[j])
//     }
//   }
//   return res
// }
// console.log(keyboardMap('23'))

// function foo() {
//   'use strict'
//   console.log(this.c) //严格模式下直接使用this，是不会默认绑定到全局的
// }
// var c = 2
// foo() // TypeError: this is undefined

// var c = 2
// function foo() {
//   console.log(this.c)
// }

// ;(function () {
//   'use strict'
//   foo() // 2, 默认绑定，this指向全局
// })()
// var o = {
//   a: 10,
//   b: {
//     // a: 12,
//     fn: function () {
//       console.log(this.a) //undefined
//     }
//   }
// }
// o.b.fn()

// function myNew(fn, ...args) {
//   const obj = {}
//   obj.__proto__ = fn.prototype
//   let result = fn.apply(obj, args)
//   return result instanceof Object ? result : obj
// }
// function fn() {
//   this.user = '追梦子'
//   return function () {}
// }
// var aa = new fn()
// console.log(aa.user)
var a = 5
function test() {
  a = 0 //这里的a是全局下的，覆盖了a=5
  console.log(a)
  console.log(this.a) //new构造函数的this指向了自己，而自己没有a,所以为undefined
  var a
  console.log(this.a, this) //这里和line4一样，都是全局的a，故一样是0
}
console.log(a, this, 'a')
new test()
