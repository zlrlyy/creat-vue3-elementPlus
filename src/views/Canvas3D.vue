<template>
  <canvas id="drawing" width="300" height="300">A drawing of something.</canvas>
</template>
<script lang="ts" setup>
import { onMounted } from 'vue'
onMounted(() => {
  let drawing = document.getElementById('drawing') as HTMLCanvasElement,
    gl
  // 确保浏览器支持<canvas>
  if (drawing?.getContext) {
    //配置参数{} page569
    try {
      gl = drawing.getContext('webgl', {})
    } catch (error) {}

    if (gl) {
      // 使用 WebGL
      gl.clearColor(0, 0, 0, 1) // 清理颜色缓冲区
      gl.clear(gl.COLOR_BUFFER_BIT) //使用之前定义的颜色填充画布
    }
  }
})
</script>
