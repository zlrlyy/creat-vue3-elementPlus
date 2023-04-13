<template>
  <form name="form1">
    <select name="location" id="selLocation" multiple>
      <option value="Sunnyvale, CA">Sunnyvale</option>
      <option value="Los Angeles, CA">Los Angeles</option>
      <option value="Mountain View, CA">Mountain View</option>
      <option value="">China</option>
      <option>Australia</option>
    </select>
  </form>
  <h2 contenteditable="true">21313123123123</h2>
</template>
<script lang="ts" setup>
import { onMounted } from 'vue'
function getSelectedOptions(selectbox: HTMLSelectElement) {
  let result = new Array()
  for (let option of selectbox.options) {
    if (option.selected) {
      result.push(option)
    }
  }
  return result
}

//表单序列化
function serialize(form: HTMLFormElement) {
  let parts = []
  let optValue
  for (let field of form.elements) {
    switch (field.type) {
      case 'select-one':
      case 'select-multiple':
        if (field.name.length) {
          for (let option of field.options) {
            if (option.selected) {
              if (option.hasAttribute) {
                optValue = option.hasAttribute('value') ? option.value : option.text
              } else {
                optValue = option.attributes['value'].specified ? option.value : option.text
              }
              parts.push(encodeURIComponent(field.name) + '=' + encodeURIComponent(optValue))
            }
          }
        }
        break
      case undefined: // 字段集
      case 'file': // 文件输入
      case 'submit': // 提交按钮
      case 'reset': // 重置按钮
      case 'button': // 自定义按钮
        break
      case 'radio': // 单选按钮
      case 'checkbox': // 复选框
        if (!field.checked) {
          break
        }
      default:
        // 不包含没有名字的表单字段
        if (field.name.length) {
          parts.push(`${encodeURIComponent(field.name)}=' + '${encodeURIComponent(field.value)}`)
        }
    }
  }
  return parts.join('&')
}

onMounted(() => {
  let selectbox = document.forms[0].elements.namedItem('location') as HTMLSelectElement

  let text = selectbox.options[0].text // 选项文本
  let value = selectbox.options[0].value // 选项值
  selectbox.options[1].selected = true
  let selectedIndex = selectbox.selectedIndex
  let selectedOption = selectbox.options[selectedIndex]
  console.log(
    `Selected index: ${selectedIndex}\n` +
      `Selected text: ${selectedOption.text}\n` +
      `Selected value: ${selectedOption.value}`
  )

  selectbox.options[3].selected = true
  let selectedOptions = getSelectedOptions(selectbox)
  let message = ''
  for (let option of selectedOptions) {
    message += `Selected index: ${option.index}\n' + 'Selected text: ${option.text}\n' + 'Selected value: ${option.value}\n`
  }
  console.log(message)

  //添加选项
  let newOption1 = document.createElement('option')
  newOption1.appendChild(document.createTextNode('Option text1'))
  newOption1.setAttribute('value', 'Option value1')
  selectbox.appendChild(newOption1)

  let newOption2 = new Option('Option text2', 'Option value2')
  selectbox.appendChild(newOption2) // 在 IE8 及更低版本中有问题

  let newOption3 = new Option('Option text3', 'Option value3')
  selectbox.add(newOption3, undefined) // 最佳方案

  //删除选项
  selectbox.removeChild(selectbox.options[selectbox.options.length - 1])
  selectbox.remove(selectbox.options.length - 1)
  // selectbox.options[selectbox.options.length - 1] = null 不推荐
  console.log(serialize(document.forms[0]))
})
</script>
