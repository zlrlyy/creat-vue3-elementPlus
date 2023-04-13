<template>
  <input type="file" id="files-list" multiple />
  <div id="droptarget" style="width: 200px; height: 200px; background: black; opacity: 0.5"></div>
  <div id="output2" style="color: pink"></div>
  <div id="output" style="color: pink"></div>
  <div id="progress" style="color: skyblue"></div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted } from 'vue'
const reader = new FileReader()
let files: FileList,
  type = 'default'

onMounted(() => {
  let filesList = document.getElementById('files-list')
  if (!filesList) return
  /*
  文件name type size属性

  filesList.addEventListener('change', (event) => {
    let files = (event.target as HTMLInputElement).files,
      i = 0,
      len = files?.length ?? 0
    if (!files) return
    while (i < len) {
      const f = files[i]
      console.log(`${f.name} (${f.type}, ${f.size} bytes)`)
      i++
    }
  }) */

  // File对象基本操作
  filesList.addEventListener('change', (event) => {
    console.log(event, event.target.files)
    files = (event.target as HTMLInputElement).files!
    const output = document.getElementById('output'),
      progress = document.getElementById('progress')

    if (!files) return
    if (/image/.test(files[0].type)) {
      reader.readAsDataURL(files[0])
      type = 'image'
    } else {
      const blob = files[0].slice(0, 32)
      reader.readAsText(blob)
      type = 'text'
    }
    reader.onabort = (event) => {
      console.log(event)
    }

    reader.onerror = function () {
      output!.innerHTML = 'Could not read file, error code is ' + reader.error.code
    }

    reader.onprogress = function (event) {
      if (event.lengthComputable) {
        progress!.innerHTML = `${event.loaded}/${event.total}`
      }
    }

    reader.onload = function () {
      let html = ''
      switch (type) {
        case 'image':
          html = `<img src="${reader.result || window.URL.createObjectURL(files[0])}">` //window.URL.createObjectURL 获取文件的url
          break
        case 'text':
          html = reader.result
          break
      }
      output!.innerHTML = html
    }
  })
  let droptarget = document.getElementById('droptarget')
  function handleEvent(event) {
    console.log(event.dataTransfer, event.type)
    let info = '',
      output = document.getElementById('output2'),
      files,
      i,
      len
    event.preventDefault()
    if (event.type === 'drop') {
      files = event.dataTransfer.files
      i = 0
      len = files.length
      while (i < len) {
        info += `${files[i].name} (${files[i].type}, ${files[i].size} bytes)<br>`
        i++
      }
      output.innerHTML = info
    }
  }
  //文件拖拽需要监听dragover 取消默认事件
  droptarget.addEventListener('dragover', (event) => {
    event.preventDefault()
  })
  droptarget.addEventListener('drop', handleEvent)

  /*   //FileReaderSync  同步读取文件 ，只在worker中可用
  // worker.js
  self.omessage = (messageEvent) => {
    const syncReader = new FileReaderSync()
    console.log(syncReader) // FileReaderSync {}
    // 读取文件时阻塞工作线程
    const result = syncReader.readAsDataUrl(messageEvent.data)
    // PDF 文件的示例响应
    console.log(result) // data:application/pdf;base64,JVBERi0xLjQK...
    // 把 URL 发回去
    self.postMessage(result)
  } */
})

/* onUnmounted(() => {
  reader.onabort = null
  reader.onerror = null
  reader.onload = null
  window.URL.revokeObjectURL(window.URL.createObjectURL(files[0]))
}) */
</script>
