<template>
  <x-foo bar>I'm inside a nonsense element.</x-foo>
  <div is="x-coo">I'm inside a nonsense element.</div>
  <div id="content"></div>
</template>

<script lang="ts" setup>
//   ***** 自定义元素名至少包含一个不在头尾的连字符
import { onMounted } from 'vue'
class FooElement extends HTMLElement {
  get bar() {
    return this.hasAttribute('bar')
  }

  set bar(val) {
    // Reflect the value of the open property as an HTML attribute.
    if (val) {
      this.setAttribute('bar', '')
    } else {
      this.removeAttribute('bar')
    }
  }
  constructor() {
    super()
  }

  static get observedAttributes() {
    // 返回应该触发 attributeChangedCallback()执行的属性
    return ['bar']
  }
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue !== newValue) {
      name === 'bar' && console.log(`${oldValue} -> ${newValue}`)
    }
  }
}
customElements.define('x-foo', FooElement)

//如果自定义元素继承了一个元素类，那么可以使用 is 属性和 extends 选项将标签指定为该自定义元素的实例  直接标签无效
class CooElement extends HTMLDivElement {
  constructor() {
    super()
    console.log('ctr')
  }
  //在每次将这个自定义元素实例添加到 DOM 中时调用
  connectedCallback() {
    console.log('connected')
  }
  //在每次将这个自定义元素实例从 DOM 中移除时调用
  disconnectedCallback() {
    console.log('disconnected')
  }
  //监听变化的属性值
  static get observedAttributes() {
    return []
  }
  //在每次可观察属性的值发生变化时调用。在元素实例初始化时，初始值的定义也算一次变化
  attributeChangedCallback() {}
  //在通过 document.adoptNode()将这个自定义元素实例移动到新文档对象时调用
  adoptedCallback() {}
}
customElements.define('x-coo', CooElement, { extends: 'div' })

onMounted(() => {
  /*
  利用影子dom和模板html 重用组件  避免css污染
  const template = document.querySelector('#x-foo-tpl') as HTMLTemplateElement
  class XooElement extends HTMLElement {
    //自定义元素 可以自由控制行为
    constructor() {
      super()
      console.log('x-xoo')
      // this 引用 Web 组件节点
      this.attachShadow({ mode: 'open' })
      this.shadowRoot?.appendChild(template.content.cloneNode(true))
    }
    connectedCallback() {}
  }
  customElements.define('x-xoo', XooElement)
  document.querySelector('#content')!.innerHTML = `<x-xoo></x-xoo>`
  console.log(document.querySelector('x-xoo') instanceof XooElement) // true
  */
  const foo = document.querySelector('x-foo') as FooElement
  console.log(foo.bar)
  foo.bar = false
  console.log(foo.bar)

  //判断是否已经定义
  customElements.whenDefined('x-foo').then(() => console.log('defined!'))
  console.log(customElements.get('x-voo'))
  // undefined
  customElements.define('x-voo', class extends HTMLElement {})
  console.log(customElements.get('x-voo'))
  // class FooElement {}
  // console.log(document.querySelector('x-foo') instanceof HTMLElement) // true

  /*  
  // 在自定义元素有定义之前会创建 HTMLUnknownElement 对象
  const fooElement = document.createElement('x-foo')
  // 创建自定义元素
  class FooElement extends HTMLElement {}
  customElements.define('x-foo', FooElement)
  console.log(fooElement instanceof FooElement) // false
  // 强制升级
  customElements.upgrade(fooElement)
  console.log(fooElement instanceof FooElement) // true */
})
</script>
