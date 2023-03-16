<template>
  <ul id="myUl"></ul>
  <span style="display: inline-block; width: 100px; word-break: break-all"
    >1111111111111111111111111111111111 <span>1231</span></span
  >
  <div id="myDivDom" data-myName="name1" data-id="id1" data-my-male="male1"></div>
</template>
<script lang="ts" setup>
import { onMounted } from 'vue'
onMounted(() => {
  const ul = document.getElementById('myUl')
  const framer = document.createDocumentFragment()
  for (let i = 0; i < 3; i++) {
    const li = document.createElement('li')
    li.appendChild(document.createTextNode(`myLi ${i}`))
    framer.appendChild(li)
  }
  ul?.appendChild(framer)

  console.log(document.readyState)
  console.log(document.compatMode)
  console.log(document.head)
  console.log(document.characterSet)

  const myDiv = document.getElementById('myDivDom')
  console.log(myDiv?.dataset)
})
</script>
