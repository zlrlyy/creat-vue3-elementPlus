<template>
  <iframe src="http://127.0.0.1:5173/form" id="myframe" frameborder="0" width="500"></iframe>
</template>
<script lang="ts" setup>
import { onMounted } from 'vue'
onMounted(() => {
  const iframe = document.getElementById('myframe') as HTMLIFrameElement
  const iframeWindow = iframe?.contentWindow
  if (iframeWindow) {
    iframe.onload = () => {
      iframeWindow.postMessage('A secret12321323', iframe.src)
    }
  }
})
</script>
