<template>
  <div class="container">
    <div class="front"></div>
    <div class="section"></div>
    <div class="back"></div>
  </div>
</template>

<style scoped>
.container {
  height: 100%;
}

.section {
  height: 100vh;
  position: relative;
  scroll-snap-align: start;
}
.front {
  width: 100vw;
  height: 100vh;
  background-color: pink;
  scroll-snap-align: start;
}
.back {
  width: 100vw;
  height: 100vh;
  background-color: skyblue;
  scroll-snap-align: start;
}
</style>
