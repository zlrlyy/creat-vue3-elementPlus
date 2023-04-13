<template>
  <form name="form1" novalidate>
    <input type="text" name="test" size="25" maxlength="50" required />
    <textarea rows="5" cols="25" maxlength="50" pattern="\d+">initial value</textarea><br />
    count
    <input type="number" min="0" max="100" step="5" name="count" /><br />
    email
    <input type="email" name="email" /><br />
    url
    <input type="url" name="homepage" /><br />
    <label for="name">name</label>
    <input type="text" name="name" readOnly tabindex="1" autofocus />
    <ul>
      <li><input type="radio" name="color" value="red" />Red</li>
      <li><input type="radio" name="color" value="green" tabIndex="3" />Green</li>
      <li><input type="radio" name="color" value="blue" tabIndex="3" />Blue</li>
    </ul>
    <input type="file" />
    <button type="reset" tabIndex="3">reset</button>
    <button type="submit" value="Submit Form" tabIndex="2" formnovalidate>submit</button>
  </form>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'

function getClipboardText(event: ClipboardEvent) {
  var clipboardData = event.clipboardData || window.clipboardData
  return clipboardData.getData('text')
}
function setClipboardText(event: ClipboardEvent, value: string) {
  if (event.clipboardData) {
    return event.clipboardData.setData('text/plain', value)
  } else if (window.clipboardData) {
    return window.clipboardData.setData('text', value)
  }
}
onMounted(() => {
  const form1 = document.forms.namedItem('form1')
  // form1?.submit()
  //通过 submit()提交表单时，submit 事件不会触发。因此在调用这个方法前要先做数据验证。
  form1?.addEventListener('submit', (event) => {
    // 阻止表单提交
    event.preventDefault()
    console.log(form1.elements.namedItem('color'))
  })

  let form = document.querySelector('form')
  if (!form) return
  let field = form.elements[0] as HTMLInputElement
  let textbox = form.elements[1] as HTMLTextAreaElement
  if (!field || !textbox) return
  field.value = 'Another value'
  // 检查字段所属的表单
  console.log(field.form === form) // true
  // 给字段设置焦点
  // field.focus()
  // 禁用字段
  // field.disabled = true
  // 改变字段的类型（不推荐，但对<input>来说是可能的）
  // field.type = 'checkbox'
  /*
focus blur change事件
field.addEventListener('focus', (event: Event) => {
    let target = event.target
    if (target.style.backgroundColor != 'red') {
      target.style.backgroundColor = 'yellow'
    }
    //选中
    event.target.select()
  })
  field.addEventListener('blur', (event: Event) => {
    let target = event.target
    target.style.backgroundColor = /[^\d]/.test(target.value) ? 'red' : ''
  })
  field.addEventListener('change', (event: Event) => {
    console.log(123)

    let target = event.target
    target.style.backgroundColor = /[^\d]/.test(target.value) ? 'red' : ''
  }) */
  /*
select
textbox.focus()
  textbox.setSelectionRange(0, 3)
  textbox.addEventListener('select', (event) => {
    console.log(`Text selected: ${textbox.value}`)
    console.log(
      textbox.selectionStart,
      textbox.selectionEnd,
      textbox.value.substring(textbox.selectionStart, textbox.selectionEnd)
    )
  })*/

  /*
输入控制
textbox.addEventListener('keypress', (event: KeyboardEvent) => {
    if (!/\d/.test(event.key) && Number(event.key) > 9 && !event.ctrlKey) {
      event.preventDefault()
    }
  }) */

  /*   
粘贴
textbox.addEventListener('paste', (event) => {
    let text = getClipboardText(event)
    if (!/^\d*$/.test(text)) {
      event.preventDefault()
    }
  }) */

  if (document.forms[0].elements[0].checkValidity()) {
    // 字段有效，继续
  } else {
    // 字段无效
  }
  if (document.forms[0].checkValidity()) {
    // 表单有效，继续
  } else {
    // 表单无效
  }
  console.log(field.validity)
})
</script>
