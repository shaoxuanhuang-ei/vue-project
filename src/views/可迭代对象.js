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
//   let resultArr = []
//   if (arr1.length === 0) return arr2
//   if (arr2.length === 0) return arr1
//   for (let i = 0; i < arr1.length; i++) {
//     for (let j = 0; j < arr2.length; j++) {
//       resultArr.push(arr1[i] + arr2[j])
//     }
//   }
//   return resultArr
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
// console.log(a, this, 'a')
// new test()

function vortex(n, m) {
  return new Array(n).fill(0).map(() => new Array(m).fill(0))
}
// console.log(vortex(3, 4))
let resultArr = []
// function getaa() {
//   for (let i = 1; i <= 10000; i++) {
//     let origin = i + ''
//     let reverse = origin.split('').reverse().join('')
//     if (origin === reverse) {
//       origin.length > 1 && resultArr.push(Number(origin))
//     }
//   }
// }
// getaa()
// console.log(resultArr)
function isInclude(S, T) {
  if (S.length < T.length) return -1
  for (let i = 0; i < S.length - T.length; i++) {
    if (S.slice(i, i + T.length) === T) return i
  }
  return -1
}
// console.log(isInclude('abbcdefab', 'bcdef'))
function bubbleSort(arr) {
  let i = arr.length - 1
  while (i > 0) {
    let pos = 0 //每次pos都要重置
    for (let j = 0; j < i; j++) {
      if (arr[j] > arr[j + 1]) {
        ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
        pos = j //每一次交换数据的最后位置
      }
    }
    i = pos
  }
  return arr
}
// console.log(bubbleSort([34, 8, 64, 51, 32, 21]))

const isObject = (val) => typeof val === 'object' && val !== null
function equals(v1, v2) {
  if (isObject(v1) && isObject(v2)) {
    const keys1 = Object.keys(v1)
    const keys2 = Object.keys(v2)
    if (keys1.length !== keys2.length) return false
    for (const k of keys1) {
      if (!(keys2.includes(k) && equals(v1[k], v2[k]))) {
        //判断存在且相等（递归判断，可能嵌套对象）
        return false
      }
    }
    return true
  } else {
    return v1 === v2
  }
}
function delDul(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (equals(arr[i], arr[j])) {
        arr.splice(j, 1)
        j--
      }
    }
  }
  return arr
}
// const arr = [1, 2, 3, 3, 5, 5, 3, 6, 4]
const arr = [
  { a: 1, b: 2 },
  { b: 2, a: 1 },
  { a: 1, b: 2, c: { a: 1, b: 2 } },
  { b: 2, a: 1, c: { b: 2, a: 1 } }
]
// console.log(delDul(arr))
function reverse(num) {
  // console.log(num)
  let string = String(num) //let string = num + ''
  if (string.length < 1) return num
  let next = string.slice(0, -1) //截取最后一位/倒数一位
  let last = string.slice(-1)
  return last + reverse(next)
}
// console.log(reverse(2468))
function rotate(arr, k) {
  let len = arr.length
  let step = k % len
  for (let i = 0; i < step; i++) {
    let val = arr.pop()
    arr.unshift(val)
  }
  return arr
}
// console.log(rotate([1, 2, 3, 4, 5, 6], 3))

function sort(arr) {
  arr = [...new Set([...arr.sort((a, b) => a - b)])]
  let resultArr = []
  let tempArr = [arr[0]]
  for (let i = 0; i < arr.length; i++) {
    let next = arr[i] + 1
    if (arr[i + 1] === next) {
      tempArr.push(arr[i + 1])
    } else {
      resultArr.push(tempArr)
      tempArr = [arr[i + 1]]
    }
  }
  return resultArr
}
// console.log(sort([2, 10, 3, 4, 5, 11, 10, 11, 20]))
// [([2, 3, 4, 5], [10, 11], [20])]
var intersection = function (nums1, nums2) {
  const result = new Set()
  const set = new Set(nums2) //法2：把nums2变成set结构，new Set()直接将nums2数组传参
  // const set = new Set()    //法1：new Set()后，遍历nums2将其加入set
  // for(num of nums2){
  //     set.add(num)
  // }
  for (let num of nums1) {
    if (set.has(num)) {
      result.add(num)
    }
  }
  return Array.from(result)
}
var nums1 = [1, 1]
var nums2 = [1]
console.log(intersection(nums1, nums2))
