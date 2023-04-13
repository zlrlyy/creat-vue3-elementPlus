<template></template>
<script lang="ts" setup>
const textEncoder = new TextEncoder()
const decodedText = '☺'
const encodedText = textEncoder.encode(decodedText)
console.log(encodedText) // Uint8Array(4) [240, 159, 152, 138]
// ☺的 UTF-8 编码是 0xF0 0x9F 0x98 0x8A（即十进制 240、159、152、138）
/* 
encodeInto 效率有区别
const textEncoder = new TextEncoder()
const fooArr = new Uint8Array(3)
const barArr = new Uint8Array(2)
const fooResult = textEncoder.encodeInto('foo', fooArr)
const barResult = textEncoder.encodeInto('bar', barArr)
console.log(fooArr) // Uint8Array(3) [102, 111, 111]
console.log(fooResult) // { read: 3, written: 3 }
console.log(barArr) // Uint8Array(2) [98, 97]
console.log(barResult) // { read: 2, written: 2 } */

//流编码
async function* chars() {
  const decodedText = 'foo'
  for (let char of decodedText) {
    yield await new Promise((resolve) => setTimeout(resolve, 1000, char))
  }
}

const decodedTextStream = new ReadableStream({
  async start(controller) {
    for await (let chunk of chars()) {
      controller.enqueue(chunk)
    }
    controller.close()
  }
})
const encodedTextStream = decodedTextStream.pipeThrough(new TextEncoderStream())
const readableStreamDefaultReader = encodedTextStream.getReader()
;(async function () {
  while (true) {
    const { done, value } = await readableStreamDefaultReader.read()
    if (done) {
      break
    } else {
      console.log(value)
    }
  }
})()

/* 
块解码
const textDecoder = new TextDecoder()
// f 的 UTF-8 编码是 0x66（即十进制 102）
// o 的 UTF-8 编码是 0x6F（即二进制 111）
const encodedText = Uint8Array.of(102, 111, 111)
const decodedText = textDecoder.decode(encodedText)
console.log(decodedText) // foo

//只支持Unit8Array
const textDecoder = new TextDecoder()
// f 的 UTF-8 编码是 0x66（即十进制 102）
// o 的 UTF-8 编码是 0x6F（即二进制 111）
const encodedText = Uint32Array.of(102, 111, 111)
const decodedText = textDecoder.decode(encodedText)
console.log(decodedText) // "f o o " 

//支持多种编码方式
const textDecoder = new TextDecoder('utf-16'); 
// f 的 UTF-8 编码是 0x0066（即十进制 102）
// o 的 UTF-8 编码是 0x006F（即二进制 111）
const encodedText = Uint16Array.of(102, 111, 111); 
const decodedText = textDecoder.decode(encodedText); 
console.log(decodedText); // foo
*/

/* 
流解码
async function* chars() {
  // 每个块必须是一个定型数组
  const encodedText = [102, 111, 111].map((x) => Uint8Array.of(x))
  for (let char of encodedText) {
    yield await new Promise((resolve) => setTimeout(resolve, 1000, char))
  }
}
const encodedTextStream = new ReadableStream({
  async start(controller) {
    for await (let chunk of chars()) {
      controller.enqueue(chunk)
    }
    controller.close()
  }
})
const decodedTextStream = encodedTextStream.pipeThrough(new TextDecoderStream())
const readableStreamDefaultReader = decodedTextStream.getReader()
;(async function () {
  while (true) {
    const { done, value } = await readableStreamDefaultReader.read()
    if (done) {
      break
    } else {
      console.log(value)
    }
  }
})()
// f
// o
// o */

/* //文本解码器流经常与 fetch()一起使用，因为响应体可以作为 ReadableStream 来处理。
const response = await fetch(url)
const stream = response.body.pipeThrough(new TextDecoderStream())
const decodedStream = stream.getReader()
for await (let decodedChunk of decodedStream) {
  console.log(decodedChunk)
} */
</script>
