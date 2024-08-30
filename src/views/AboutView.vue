<template>
  <!-- 动态组件时，到第n帧之后，才会渲染第n个组件 -->
  <div v-for="n in 100"></div>
</template>
<script setup>
// function cake(fn, ...args) {
//   return function (...restArgs) {
//     let allArgs = [...args, ...restArgs]
//     if (allArgs.length >= fn.length) {
//       return fn.call(this, ...allArgs)
//     } else {
//       return cake(fn, ...allArgs)
//     }
//   }
// }
// const sum = (a, b, c, d) => a + b + c + d
// cake(sum)(1, 2)(3)(4)
function currying(fn, ...args) {
  return function (...rest) {
    let allArgs = [...args, ...rest]
    //fn函数的length属性可以拿到形参的数量
    if (allArgs.length >= fn.length) {
      //参数数量大于等于fn函数所需参数则运行该函数，否则再继续追加参数
      console.log(this, 'this')
      return fn.call(this, ...allArgs)
    } else {
      return currying(fn, ...allArgs)
    }
  }
}
const sum = (a, b, c, d) => a + b + c + d
currying(sum)(1)(2)(3)(4) //每次传参可以多个，单个或直接不传
currying(sum, 1)(2, 3)(4)
console.log(sum, 'sum')
</script>
<style></style>
