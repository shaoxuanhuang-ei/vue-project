<template>
  <div class="banner_container">
    <!-- 6张图片 -->
    <div class="img_box">
      <div>
        <a href=""><img src="../assets/1.jpg" alt="" /></a>
      </div>
      <div>
        <a href=""><img src="../assets/2.jpg" alt="" /></a>
      </div>
      <div>
        <a href=""><img src="../assets/3.jpg" alt="" /></a>
      </div>
    </div>
    <div class="sel_box" id="aa">
      <span class="cur"></span>
      <span></span>
      <span></span>
    </div>

    <!-- 左箭头 -->
    <div class="left_btn">&lt;</div>
    <!-- 右箭头 -->
    <div class="right_btn">&gt;</div>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
const curIndex = ref(0)
onMounted(() => {
  const doms = {
    carousel: document.querySelector('.img_box'),
    indicators: document.querySelectorAll('.sel_box span'),
    arrowLeft: document.querySelector('.left_btn'),
    arrowRight: document.querySelector('.right_btn')
  }

  function moveTo(index) {
    doms.carousel.style.transform = `translateX(-${index * 400}px)` //bug1
    doms.carousel.style.transition = '0.5s'
    const active = document.querySelector('.cur')
    // const active = document.querySelector('.sel_box span .cur') //null?
    active.classList.remove('cur')
    doms.indicators[index].classList.add('cur')
    curIndex.value = index
  }
  doms.indicators.forEach(function (item, i) {
    item.onclick = function () {
      // curIndex.value = i
      moveTo(i)
    }
  })
  function init() {
    // 复制第一张图
    const first = doms.carousel.firstElementChild.cloneNode(true)
    // 复制最后一张图
    const last = doms.carousel.lastElementChild.cloneNode(true)
    // 将第一张图放到最后
    doms.carousel.appendChild(first)
    // 将最后一张图放到初始位置
    doms.carousel.insertBefore(last, doms.carousel.firstElementChild)
    // 设置最后一张复制图为绝对定位
    last.style.position = 'absolute'
    last.style.transform = 'translateX(-400px)'
    //如果这里不设置，而是在css中去设置img_box,索引0，第一次向右翻是没有动的
    // 设置的是last而不应该是整个盒子？bug1
  }
  init()
  const count = doms.indicators.length
  function toPrev() {
    if (curIndex.value === 0) {
      doms.carousel.style.transform = `translateX(-${count * 400}px)`
      doms.carousel.style.transition = 'none'
      // 取消动画，实现无缝切换,但是这里虽然取消了动画，
      // 但moveTo里面又添加了动画，所以浏览器还来不及做这里的渲染，因此这里需要强制渲染
      doms.carousel.clientHeight // 这里读取节点的高度，触发浏览器的布局重绘，然后执行取消动画（否则这里是渲染不了的）
      moveTo(count - 1)
    } else {
      // curIndex.value--
      moveTo(curIndex.value - 1)
    }
  }
  function toNext() {
    if (curIndex.value === count - 1) {
      doms.carousel.style.transform = 'translateX(100%)'
      doms.carousel.style.transition = 'none'
      doms.carousel.clientHeight // 强制渲染
      moveTo(0)
    } else {
      moveTo(curIndex.value + 1)
    }
  }
  doms.arrowLeft.onclick = toPrev
  doms.arrowRight.onclick = toNext
})
</script>
<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.banner_container {
  position: relative;
  margin: auto;
  transform: translateY(50%);
  transform: translateX(-50%);
  width: 400px;
  height: 300px;
  /* 超出隐藏 */
  overflow: hidden;
}

.img_box {
  position: absolute;
  width: 100%;
  height: 100%;
  /* html中的第一张图片不是我们想要显示，第二张才是我们轮播图的第一张图片因此要让这排图片往左移动一张图片的距离 */
  display: flex;
  /* transform: translateX(-400px); */
  transition: 0.5s;
  align-items: center;
}

/* 图片大小 */
.img_box img {
  display: block;
  width: 400px;
  height: 300px;
}

/* 小圆点 */
.sel_box {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
}

.sel_box span {
  /* 转换为行内块元素 -- 一行显示 */
  display: inline-block;
  width: 10px;
  height: 10px;
  background-color: rgb(78, 78, 78);
  margin-right: 6px;
  border-radius: 5px;
  transition: all 0.4s;
}

/* 左箭头 */
.left_btn {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  width: 25px;
  height: 30px;
  background-color: #fff;
  line-height: 30px;
  padding-left: 3px;
  /* 将鼠标样式改为小手 */
  cursor: pointer;
}

.right_btn {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  width: 25px;
  height: 30px;
  background-color: #fff;
  line-height: 30px;
  padding-left: 5px;
  cursor: pointer;
}

/* 当前图片的小图点样式 */
.sel_box .cur {
  background-color: #fff !important;
  transform: scale(1.3);
}
</style>
