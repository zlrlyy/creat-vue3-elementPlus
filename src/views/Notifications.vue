<template></template>
<script lang="ts" setup>
//页面通知请求权限  granted同意   denied拒绝   拒绝之后无法通知
Notification.requestPermission().then((permission) => {
  console.log('User responded to permission request:', permission)
})

// const n = new Notification('Title text!')
// setTimeout(() => n.close(), 3000)
/* 
通知
const n = new Notification('Title text123!', {
  body: 'Body text!'
  image: '/img/img1.jpg',
  vibrate: [200, 100, 200] //震动
})

n.onshow = () => console.log('Notification was shown!')
n.onclick = () => console.log('Notification was clicked!')
n.onclose = () => console.log('Notification was closed!')
n.onerror = () => console.log('Notification experienced an error!') */

console.log(document.visibilityState)

document.addEventListener('visibilitychange', (event) => {
  console.log(document.visibilityState, document.hidden, event)
})
</script>
