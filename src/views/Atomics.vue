<template></template>
<script lang="ts" setup>
import { onMounted } from 'vue'
onMounted(() => {
  const workerScript = ` 
self.onmessage = ({data}) => { 
 const view = new Int32Array(data); 
 console.log('Waiting to obtain lock'); 
 // 遇到初始值则停止，10 000 毫秒超时

Atomics.wait(view, 0, 0, 1E5); 
 console.log('Obtained lock'); 
 // 在索引 0 处加 1 
 Atomics.add(view, 0, 1); 
 console.log('Releasing lock',view[0]); 
 // 只允许 1 个工作线程继续执行
 Atomics.notify(view, 0, 1); 
 self.postMessage(null); 
}; 
`
  const workerScriptBlobUrl = URL.createObjectURL(new Blob([workerScript]))
  const workers = []
  //添加四个worker
  for (let i = 0; i < 4; ++i) {
    workers.push(new Worker(workerScriptBlobUrl))
  }
  // 在最后一个工作线程完成后打印出最终值
  let responseCount = 0
  for (const worker of workers) {
    worker.onmessage = () => {
      if (++responseCount == workers.length) {
        console.log(`Final buffer value: ${view[0]}`)
      }
    }
  }
  // 初始化 SharedArrayBuffer
  const sharedArrayBuffer = new SharedArrayBuffer(8)
  const view = new Int32Array(sharedArrayBuffer)
  // 把 SharedArrayBuffer 发送到每个工作线程
  for (const worker of workers) {
    worker.postMessage(sharedArrayBuffer)
  }
  // 1000 毫秒后释放第一个锁
  setTimeout(() => Atomics.notify(view, 0, 1), 1000)
})
</script>
