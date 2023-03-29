<template>
  <h1 id="div" data-value="456" @click="handleClick">123</h1>
</template>
<script lang="ts" setup>
import { onMounted } from 'vue'
onMounted(() => {
  const dom = document.getElementById('div')
  dom?.addEventListener('click', () => {
    console.log(this)
  })
})

const handleClick = (event: Event) => {
  console.log(event, event.target)
}
</script>
