<template></template>
<script lang="ts" setup>
const image = new Image()
image.addEventListener('load', (event) => {
  console.log('Image loaded!')
})
image.addEventListener('error', (event) => {
  console.log('Image not loaded!') //error发生load结束，不会触发onLoad
})
image.src = 'doesnotexist.gif'

function pauseExecution() {
  console.log('Will print before breakpoint')
  debugger
  console.log('Will not print until breakpoint continues')
}
/* try {
  //InternalError 底层js引擎异常
  throw new URIError('URIError') // 只会在使用 encodeURI()或 decodeURI()但传入了格式错误的URI 时发生
  throw new TypeError('typeError') // 类型错误 在变量不是预期类型，或者访问不存在的方法时   eg:let o = new 10;console.log("name" in true);
  throw new SyntaxError('SyntaxError') //经常在给 eval()传入的字符串包含 JavaScript 语法错误时发生
  throw new ReferenceError('referenceError') // 找不到对象时发生  obj=x x未定义时
  throw new RangeError('rangeError') //在数值越界时抛出 eg: let items1 = new Array(-20); let items2 = new Array(Number.MAX_VALUE);
  throw new EvalError('evalError') //用 eval()函数发生异常时抛出 eg: new eval();  eval = foo
  throw new TypeError('132456')
} catch (error) {
  if (error instanceof Error) console.log(error.message, error.name)
} */

const createElement = () => {
  try {
    return 123
  } catch (error) {
    return 456
  } finally {
    return 789 //finally必执行，省略了return
  }
}
console.log(createElement())
</script>
