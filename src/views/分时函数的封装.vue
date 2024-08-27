<template>
  <button class="btn">生成10万个元素</button>
</template>
<script setup>
import { onMounted, ref } from 'vue'
onMounted(() => {
  const btn = document.querySelector('.btn')
  const datas = Array.from({ length: 100000 }, (_, i) => i)
  // btn.onclick = () => {
  //   // 方案一：正常这么生成的话是会有一段时间的卡顿的，因为任务量太多，需要耗费一定的时间，会影响渲染
  //   for (const i of datas) {
  //     const div = document.createElement('div')
  //     div.textContent = i
  //     document.body.appendChild(div)
  //   }
  // }

  //方案二：requestIdleCallback
  // btn.onclick = () => {
  //   // 方案一：正常这么生成的话是会有一段时间的卡顿的，因为任务量太多，需要耗费一定的时间，会影响渲染
  //   // for (const i of datas) {
  //   //   const div = document.createElement('div')
  //   //   div.textContent = i
  //   //   document.body.appendChild(div)
  //   // }
  //   const taskHandler = (data, i) => {
  //     const div = document.createElement('div')
  //     div.textContent = data
  //     document.body.appendChild(div)
  //   }
  //   performChunk(datas, taskHandler)
  // }
  // function performChunk(datas, taskHandler) {
  //   if (typeof datas === 'number') {
  //     datas = { length: datas } //生成指定length的伪数组
  //   }
  //   if (datas.length === 0) return
  //   let i = 0
  //   // 执行下一块任务
  //   function _run() {
  //     // 任务执行完毕return，否则接着执行下一块任务
  //     if (i >= datas.length) return
  //     requestIdleCallback((idle) => {
  //       // requestIdleCallback可以判断浏览器是否空闲（浏览器16毫秒渲染一次，16毫秒内有空闲的话让他执行下这个任务
  //       while (idle.timeRemaining() > 0 && i < datas.length) {
  //         // 执行一个任务
  //         taskHandler(datas[i], i)
  //         i++
  //       }
  //       // while循环结束：要么该渲染帧内没时间了，要么任务全部执行完了，就继续运行下一块任务
  //       _run()
  //     })
  //   }
  //   _run() //启动任务
  // }
  btn.onclick = () => {
    const taskHandler = (_, i) => {
      const div = document.createElement('div')
      div.innerText = i
      document.body.appendChild(div)
    }
    browserPerformChunk(100000, taskHandler)
  }
  function performChunk(datas, taskHandler, scheduler) {
    //scheduler调度器，判断是否执行
    if (typeof datas === 'number') {
      datas = { length: datas } //生成指定length的伪数组
    }
    if (datas.length === 0) return
    let i = 0
    // 执行下一块任务
    function _run() {
      // 任务执行完毕return，否则接着执行下一块任务
      if (i >= datas.length) return
      scheduler((isGoOn) => {
        // requestIdleCallback可以判断浏览器是否空闲（浏览器16毫秒渲染一次，16毫秒内有空闲的话让他执行下这个任务
        while (isGoOn() && i < datas.length) {
          // 执行一个任务
          taskHandler(datas[i], i)
          i++
        }
        // while循环结束：要么该渲染帧内没时间了，要么任务全部执行完了，就继续运行下一块任务
        _run()
      })
    }
    _run() //启动任务
  }
  function browserPerformChunk(datas, taskHandler) {
    // scheduler返回布尔值，判断要不要继续
    const scheduler = (task) => {
      requestIdleCallback((idle) => {
        task(() => idle.timeRemaining() > 0)
      })
    }
    performChunk(datas, taskHandler, scheduler)
  }
})
</script>
