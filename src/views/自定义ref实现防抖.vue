<!-- <template>
  <input @input="debounceInput">
  <p>{{ text }}</p>
</template>
<script>
import { ref } from 'vue'

const text = ref('')
const textInput = (e) => {
  text.value = e.target.value
}
const debounce = (fn, delay) => {
  let timer = null
  return function (...args) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}
const debounceInput = debounce(textInput, 500)
</script> -->
<template>
  <input v-model="text">
  <p>{{ text }}</p>
</template>
<script>
import { ref } from 'vue'
const text = debounceRef('', 500)
const debounceRef = (value, delay = 1000) => {
  let timer
  // 自定义ref 可以实现追踪和触发更新
  return customRef((track, trigger) => ({
    get() {
      // 依赖收集
      track()
      return value
    },
    set(val) {
      clearTimeout(timer)
      timer = setTimeout(() => {
        // 派发更新
        trigger()
        value = val
      }, delay)
    }
  }))
}
</script>