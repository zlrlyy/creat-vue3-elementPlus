<template>
  <iframe :srcDoc="template" frameborder="0"></iframe>
  <div id="foo"></div>
</template>
<script lang="ts" setup>
import template from '@/template/template'
import { onMounted } from 'vue'

onMounted(() => {
  // 也可以使用 document.createDocumentFragment()
  const fragment = new DocumentFragment()
  const foo = document.querySelector('#foo')
  // 为 DocumentFragment 添加子元素不会导致布局重排
  fragment.appendChild(document.createElement('p'))
  fragment.appendChild(document.createElement('p'))
  fragment.appendChild(document.createElement('p'))
  console.log(fragment.children.length) // 3
  foo!.appendChild(fragment)
  console.log(fragment.children.length) // 0
  console.log(document.body.innerHTML)
})
</script>
