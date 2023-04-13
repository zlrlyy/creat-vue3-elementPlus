<template>
  <div id="droptarget" style="width: 200px; height: 200px; background: pink; opacity: 0.5"></div>
  <div id="dragtarget" draggable="true">213131312313212312</div>
  <div id="dragdisable" draggable="false">999999999999999999</div>
  <img src="/img/img1.jpg" id="image" />
</template>
<script lang="ts" setup>
import { onMounted } from 'vue'

/*
阻止默认事件 使元素变为可拖拽元素
droptarget.addEventListener("dragover", (event) => {
 event.preventDefault();
});
droptarget.addEventListener("dragenter", (event) => {
 event.preventDefault();
}); */

/*
阻止drap的默认事件 如firefox自动导航
droptarget.addEventListener('drop', (event) => {
  event.preventDefault()
}) */
onMounted(() => {
  const dragTarget = document.getElementById('dragtarget')
  const dropTarget = document.getElementById('droptarget')
  const imgDom = document.querySelector('img')
  if (!dragTarget || !dropTarget) return
  document.addEventListener('dragstart', (event) => {
    const dataTransfer = event.dataTransfer
    const target = event.target as HTMLDivElement
    if (!target || !dataTransfer) return

    dataTransfer.setData('text', target.id ?? target.parentNode.id)
    dataTransfer.effectAllowed = 'copy'
    dataTransfer.setDragImage(imgDom, 0, 0) //拖拽时显示的图片
    dataTransfer.clearData('text') //清除数据
    console.log(dataTransfer.types) //拖拽的类型

    // if (/^http/.test(target.textContent)) {
    //   dataTransfer?.setData('URL', target.textContent)
    // } else {
    //   dataTransfer?.setData('text', target.textContent)
    // }
  })
  dropTarget.addEventListener('dragenter', (event) => {
    event.preventDefault()
    const dataTransfer = event.dataTransfer
    if (!dataTransfer) return
    dataTransfer.dropEffect = 'copy'
  })
  dropTarget.addEventListener('dragover', (event) => {
    event.preventDefault()
    const dataTransfer = event.dataTransfer
    if (!dataTransfer) return
  })
  dropTarget.addEventListener('drop', (event) => {
    event.preventDefault()
    const dataTransfer = event.dataTransfer
    let url = dataTransfer?.getData('url') || dataTransfer?.getData('text/uri-list')
    // 读取文本
    let text = dataTransfer?.getData('Text')
    console.log(event, text)

    event.target.appendChild(document.getElementById(text))
    url && window.open(url)
  })
})
</script>
