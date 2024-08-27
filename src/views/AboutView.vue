<template>
  <!-- 动态组件时，到第n帧之后，才会渲染第n个组件 -->
  <div v-for="n in 100">
    <div v-if="userDefer(n)">111</div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
// defer优化白屏：一帧一帧渲染，不一次性渲染，总的加载时间不变，但是提升用户体验
function userDefer(maxFrameCount = 1000) {
  const frameCount = ref(0)
  const refreshFrameCount = () => {
    requestAnimationFrame(() => {
      frameCount.value++
      if (frameCount.value < maxFrameCount) {
        refreshFrameCount()
      }
    })
  }
  refreshFrameCount()
  return function (showInFrameCount) {
    return frameCount.value >= showInFrameCount //当前渲染帧大于等于传入的帧，说明可以渲染当前帧的数据了
  }
}
</script>
<style></style>
