<template></template>
<script lang="ts" setup>
/*
//可读流
async function* ints() {
  // 每 1000 毫秒生成一个递增的整数
  for (let i = 0; i < 5; ++i) {
    yield await new Promise((resolve) => setTimeout(resolve, 1000, i))
  }
}

const readableStream = new ReadableStream({
  async start(controller) {
    for await (let chunk of ints()) {
      controller.enqueue(chunk)
    }
    console.log(controller) // ReadableStreamDefaultController {}
    controller.close()
  }
})

console.log(readableStream.locked) // false
const readableStreamDefaultReader = readableStream.getReader()
console.log(readableStream.locked) // true

// 消费者
;(async function () {
  while (true) {
    const { done, value } = await readableStreamDefaultReader.read()
    if (done) {
      break
    } else {
      console.log(value)
    }
  }
})() */

/* 
可写流
function* ints(): IterableIterator<Promise<number>> {
  // 每 1000 毫秒生成一个递增的整数
  for (let i = 0; i < 5; ++i) {
    yield new Promise((resolve) => setTimeout(resolve, 1000, i))
  }
}

const writableStream = new WritableStream({
  write(value) {
    console.log(value)
  }
})
console.log(writableStream.locked) // false
const writableStreamDefaultWriter = writableStream.getWriter()
console.log(writableStream.locked) // true

// 生产者
;(async function () {
  for await (let chunk of ints()) {
    await writableStreamDefaultWriter.ready
    writableStreamDefaultWriter.write(chunk)
  }
  writableStreamDefaultWriter.close()
})() */

/*
//转换流 
function* ints(): IterableIterator<Promise<number>> {
  for (let i = 0; i < 5; i++) {
    yield new Promise((resolve) => setTimeout(resolve, 1000, i))
  }
}
const { readable, writable } = new TransformStream({
  transform(chunk, controller) {
    controller.enqueue(chunk * 2)
  }
})
const readableStreamDefaultReader = readable.getReader()
const writableStreamDefaultWriter = writable.getWriter()
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
;(async function () {
  for await (let chunk of ints()) {
    await writableStreamDefaultWriter.ready
    writableStreamDefaultWriter.write(chunk)
  }
  writableStreamDefaultWriter.close()
})() */

//pipeThroush   pipeTo 连接管道
function* ints() {
  // 每 1000 毫秒生成一个递增的整数
  for (let i = 0; i < 5; ++i) {
    yield new Promise((resolve) => setTimeout(resolve, 1000, i))
  }
}
const integerStream1 = new ReadableStream({
  async start(controller) {
    for await (let chunk of ints()) {
      controller.enqueue(chunk)
    }
    controller.close()
  }
})
const integerStream2 = new ReadableStream({
  async start(controller) {
    for await (let chunk of ints()) {
      controller.enqueue(chunk)
    }
    controller.close()
  }
})
const doublingStream = new TransformStream({
  transform(chunk, controller) {
    controller.enqueue(chunk * 2)
  }
})

const writableStream = new WritableStream({
  write(value) {
    console.log(value)
  }
})
// pipeThrough 通过管道连接流
const pipedStream1 = integerStream1.pipeThrough(doublingStream)
//pipeTo()方法 将 ReadableStream2 连接到 WritableStream 直接执行
const pipedStream2 = integerStream2.pipeTo(writableStream)
// 从连接流的输出获得读取器
const pipedStreamDefaultReader1 = pipedStream1.getReader()
// 消费者
;(async function () {
  while (true) {
    const { done, value } = await pipedStreamDefaultReader1.read()
    if (done) {
      break
    } else {
      console.log(value)
    }
  }
})()
</script>
