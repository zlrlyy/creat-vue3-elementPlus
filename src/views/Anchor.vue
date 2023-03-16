<template>
  <button @click="handleClick">Anchor</button>
  <h1 style="width: 100vw; height: 2000px; background-color: red">ClientCheck</h1>
  <div ref="anchor">123131</div>
  <h1 style="width: 100vw; height: 2000px; background-color: red">ClientCheck</h1>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const anchor = ref<HTMLDivElement>()
const handleClick = () => {
  if (!anchor.value) return
  anchor.value.scrollIntoView(true)
}
</script>
