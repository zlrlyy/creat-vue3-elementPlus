<template>
  <div id="content">
    <p slot="foo">Foo</p>
    <p slot="bar">Bar</p>
  </div>
</template>
<script lang="ts" setup>
import { onMounted } from 'vue'
onMounted(() => {
  //shadowDom限制css在对应的dom上
  /*
  document.querySelector('#content')!.innerHTML = `
 <div id="foo"></div>
 <div id="bar"></div>
`
  const foo = document.querySelector('#foo') as HTMLDivElement
  const bar = document.querySelector('#bar') as HTMLDivElement
  const openShadowDOM = foo.attachShadow({ mode: 'open' })
  const closedShadowDOM = bar.attachShadow({ mode: 'closed' }) //closed不可通过shadowRoot获取dom
  console.log(openShadowDOM) // #shadow-root (open)
  console.log(closedShadowDOM) // #shadow-root (closed)
  console.log(foo.shadowRoot) // #shadow-root (open)
  console.log(bar.shadowRoot) // null */

  //影子dom css限制
  //slot插槽内是真实dom的映射
  for (let color of ['red', 'green', 'blue']) {
    const div = document.createElement('div')
    div.innerText = `Make me ${color}`
    document.body.appendChild(div)
    const shadowDOM = (div.attachShadow({ mode: 'open' }).innerHTML = ` 
 <p><slot></slot></p> 
 <style> 
 p { 
 color: ${color}; 
 } 
 </style> 
 `)
  }
  function countP(node: HTMLElement | Document | ShadowRoot) {
    console.log(node.querySelectorAll('p').length)
  }
  countP(document) // 0
  const divList = document.querySelectorAll('div')

  for (let element of Array.from(divList).splice(-3, 3)) {
    countP(element.shadowRoot!)
  }

  //命名槽位会对应映射
  document.querySelector('#content')!.attachShadow({ mode: 'open' }).innerHTML = ` 
 <slot name="bar"></slot> 
 <slot name="foo"></slot> 
 `
  // Renders:
  // Bar
  // Foo

  /* 
  事件会冒泡
    // 创建一个元素作为影子宿主
    document.body.innerHTML = ` 
  <div onclick="console.log('Handled outside:', event.target)"></div> 
  `
    // 添加影子 DOM 并向其中插入 HTML
    document.querySelector('div').attachShadow({ mode: 'open' }).innerHTML = ` 
  <button onclick="console.log('Handled inside:', event.target)">Foo</button> 
` */
})
</script>
