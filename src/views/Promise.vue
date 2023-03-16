<template>
  <button id="start">Start</button>
  <button id="cancel">Cancel</button>
</template>
<script lang="ts">
import { defineComponent, onMounted } from 'vue'
export default defineComponent({
  data() {
    return {}
  },
  mounted() {
    /*
   早期嵌套setTimeout
   function double(value: any, success: any, failure?: any) {
      setTimeout(() => {
        try {
          if (typeof value !== 'number') {
            throw 'Must provide number as first argument'
          }
          success(2 * value)
        } catch (e) {
          failure(e)
        }
      }, 1000)
    }
    const successCallback = (x: any) => {
      double(x, (y: any) => console.timeEnd(`123`))
    }
    const failureCallback = (e: any) => console.log(`Failure: ${e}`)
    console.time('123')
    double(3, successCallback, failureCallback) */
    /*     let p = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.5) {
          resolve('resolve')
        } else {
          reject(new Error('reject'))
        }
      }, 1000)
    })
    // p.then(
    //   (res) => console.log(res, p),
    //   (res) => console.log(111, res, p)
    // )

    p.catch((res) => console.log(res, p)) */
    /*     let p = new Promise((resolve, reject) => resolve('123'))
    // 在 console.log 打印期约实例的时候，已经执行超时回调（即 resolve()）, setTimeout无延迟, 延迟0ms
    setTimeout(console.log, 0, p) // Promise <fulfilled> */
    /*  let p = new Promise(() => {})
    setTimeout(console.log, 0, p) // Promise <pending>
    setTimeout(console.log, 0, Promise.resolve(p), p) // Promise <pending>
    setTimeout(console.log, 0, p === Promise.resolve(p), p) // true */
    /*
      取消Promise
      class CancelToken {
            promise: Promise<string>
            constructor(cancelFn: any) {
              this.promise = new Promise<string>((resolve, reject) => {
                cancelFn(() => {
                  setTimeout(console.log, 0, 'delay cancelled')
                  resolve('resolve')
                })
              })
            }
          }
    const startButton = document.querySelector('#start')
    const cancelButton = document.querySelector('#cancel')
    function cancellableDelayedResolve(delay: number) {
      setTimeout(console.log, 0, 'set delay')
      return new Promise<string>((resolve, reject) => {
        const id = setTimeout(() => {
          setTimeout(console.log, 0, 'delayed resolve')
          resolve('resolve')
        }, delay)

        const cancelToken = new CancelToken((cancelCallback: any) =>
          cancelButton!.addEventListener('click', cancelCallback)
        )
        cancelToken.promise.then(() => clearTimeout(id))
      })
    }
    startButton!.addEventListener('click', () => cancellableDelayedResolve(1000)) */

    /*     class TrackablePromise extends Promise<any> {
      notifyHandlers: any[]
      constructor(executor: Function) {
        const notifyHandlers: any[] = []
        super((resolve, reject) => {
          return executor(resolve, reject, (status: string) => {
            notifyHandlers.map((handler) => handler(status))
          })
        })
        this.notifyHandlers = notifyHandlers
      }
      notify(notifyHandler: (status: string) => void) {
        this.notifyHandlers.push(notifyHandler)
        return this
      }
    }

    let p = new TrackablePromise((resolve: () => void, reject: () => void, notify: any) => {
      function countdown(x: any) {
        if (x > 0) {
          notify(`${20 * x}% remaining`)
          setTimeout(() => countdown(x - 1), 1000)
        } else {
          resolve()
        }
      }
      countdown(5)
    })

    p.notify((x: any) => setTimeout(console.log, 0, 'progress1:', x)).notify((x: any) =>
      setTimeout(console.log, 1000, 'progress2:', x)
    )
    p.then(() => setTimeout(console.log, 0, 'completed')) */

    class MyPromise extends Promise<any> {
      handles: any[]
      constructor(fn: any) {
        const handle: any[] = []
        super((resolve, reject) => {
          return fn(resolve, reject, (tag: string) => {
            handle.map((item) => item(tag))
          })
        })
        this.handles = handle
      }
      notify(handle: any) {
        this.handles.push(handle)
        return this
      }
    }

    const p = new MyPromise((resolve: () => void, reject: () => void, fn: (tag: string) => void) => {
      const count = (num: number) => {
        if (num > 0) {
          fn(`tag${num}`)
          setTimeout(() => count(num - 1), 1000)
        } else {
          resolve()
        }
      }
      count(5)
    })
    console.log(p)

    p.notify((x: any) => setTimeout(console.log, 0, 'progress1:', x)).notify((x: any) =>
      setTimeout(console.log, 0, 'progress2:', x)
    )
    p.then(() => setTimeout(console.log, 0, 'completed'))
  }
})
</script>
