<template>
  <a href="mailto:1312016025@qq.com">1312016025@qq.com</a>
</template>
<script lang="ts" setup>
/*
//performance.timeOrigin精确事件戳
const foo = () => {
  console.log(123)
}
const t0: number = Date.now()
const p0 = performance.now() //精确计算用时，单调增长，不会相等
foo()
const t1: number = Date.now()
const p1 = performance.now()
const duration0 = t1 - t0
const duration1 = p1 - p0
console.log(duration0, duration1, performance.timeOrigin) */

//User Timing API 记录和分析自定义性能条目
console.log(performance.getEntries()[0], performance.getEntries()[1])
performance.mark('foo')
for (let i = 0; i < 1e6; ++i) {}
performance.mark('bar')
const [endMark, startMark] = performance.getEntriesByType('mark')
console.log(startMark.startTime - endMark.startTime) // 1.3849999904632568

performance.mark('foo')
for (let i = 0; i < 1e6; ++i) {}
performance.mark('bar')
performance.measure('baz', 'foo', 'bar') //标记foo和bar之间的时间  name为'baz'
const [differenceMark] = performance.getEntriesByType('measure')
console.log(differenceMark)

//Navigation Timing API 度量当前页面加载速度
const [performanceNavigationTimingEntry] = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[] //计算了 loadEventStart 和 loadEventEnd 时间戳之间的差
console.log(performanceNavigationTimingEntry)
console.log(performanceNavigationTimingEntry.loadEventEnd - performanceNavigationTimingEntry.loadEventStart)

//Resource Timing Api 度量当前页面加载时请求资源的速度
const performanceResourceTimingEntry = performance.getEntriesByType('resource')[0] as PerformanceResourceTiming
console.log(performanceResourceTimingEntry)
console.log(performanceResourceTimingEntry.responseEnd - performanceResourceTimingEntry.requestStart)
</script>
