<template>
  <div class="about">
    <!-- <h1>This is an about page</h1> -->
    <div class="father">
      <div class="son">
        <div class="container"></div>
      </div>
    </div>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
    --color: cadetblue;
    .father {
      width: 50%;
      background: red;
      margin: 0 auto;
      .son {
        position: relative;
        width: 100%;
        height: 0;
        padding-bottom: 75%;
        background-color: var(--color);
        .container {
          position: absolute;
          background: #000;
          inset: 0;
        }
      }
    }
  }
}
</style>
