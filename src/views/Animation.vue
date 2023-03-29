<template>
  <div id="container">
    <div id="status" style="width: 10px"></div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
onMounted(() => {
  /*
   requestAnimationFrame使用与终止

  function updateProgress(time: DOMHighResTimeStamp) {
    //下次重绘的时间
    console.log(time)
    const div = document.getElementById('status')
    if (!div) return
    console.log(div.style.width, parseInt(div.style.width, 10))

    div.style.width = parseInt(div.style.width, 10) + 5 + 'px'
    if (parseInt(div.style.width, 10) <= 100) {
      requestAnimationFrame(updateProgress)
    }
  }
  requestAnimationFrame(updateProgress)

  function log() {
    console.log('Repaint!')
    requestAnimationFrame(log)
  }

  let requestID = window.requestAnimationFrame(log)
  window.cancelAnimationFrame(requestID) */

  /*
   requestAnimationFramek节流
function expensiveOperation() {
    console.log('Invoked at', Date.now())
  }
  window.addEventListener('scroll', () => {
    expensiveOperation()
  })

  let enqueued = false
  function expensiveOperation3() {
    console.log('Invoked at', Date.now())
    enqueued = false
  }
  window.addEventListener('scroll', () => {
    if (!enqueued) {
      enqueued = true
      window.requestAnimationFrame(expensiveOperation)
    }
  }) */
  //settimeout节流  requestAnimationFrame控制在哪个周期渲染
  let enabled = true
  function expensiveOperation2() {
    console.log('123131,Invoked at', Date.now())
  }
  window.addEventListener('scroll', () => {
    if (enabled) {
      enabled = false
      window.requestAnimationFrame(expensiveOperation2)
      window.setTimeout(() => (enabled = true), 50)
    }
  })
})
</script>

<style scoped>
#container {
  height: 150vh;
  width: 100px;
  background-color: pink;
}
#status {
  width: 10px;
  height: 10px;
  background-color: #fff;
}
</style>
