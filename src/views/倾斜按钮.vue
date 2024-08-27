<template>
  <div>
    <!-- 倾斜按钮 -->
    <button class="btn">按钮</button>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
    --color: cadetblue;
    .btn {
      position: relative;
      background: var(--color);
      color: #fff;
      padding: 10px;
      width: 120px;
      height: 60px;
      border: none;
      border-radius: 15px 0;
      transform: skew(-20deg);
      &::before {
        content: '';
        position: absolute;
        width: 20px;
        height: 20px;
        background: radial-gradient(
          circle at 0 0,
          transparent 0 20px,
          var(--color) 21px
        ); /* 径向渐变 */
        bottom: 0;
        left: -20px;
      }
      &::after {
        content: '';
        position: absolute;
        width: 20px;
        height: 20px;
        background: radial-gradient(
          circle at 100% 100%,
          transparent 0 20px,
          var(--color) 21px
        ); /* 径向渐变 */
        top: 0;
        right: -20px;
      }
    }
  }
}
</style>
