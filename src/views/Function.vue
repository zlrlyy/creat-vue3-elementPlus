<template>
  <div></div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      someObject: {}
    }
  },
  //箭头函数无this,arguments,prototype,无法new 操作
  mounted() {
    /*     const newObject = {}
    this.someObject = newObject
    const obj = {
      a: 1,
      fun(b: number, c: number) {
        const a = 2
        const fun1 = (d: number) => {
          console.log(JSON.parse(JSON.stringify(this)), ...arguments)
        }
        fun1(3)
      }
    }
    obj.fun(1, 2) // false

    //functin name是指针指向函数
    console.log(new Function().name) //"anonymous"匿名的
    console.log((() => {}).name) //空字符串

    function foo() {}
    console.log(foo.bind(null).name) // bound foo

    let dog = {
      years: 1,
      get age() {
        return this.years
      },
      set age(newAge) {
        this.years = newAge
      }
    }
    let propertyDescriptor = Object.getOwnPropertyDescriptor(dog, 'age')
    console.log(propertyDescriptor)
    console.log(propertyDescriptor!.get!.name) // get age
    console.log(propertyDescriptor!.set!.name) // set age

    function sayHi() {
      console.log('Hello ' + arguments[0] + ', ' + arguments[1], arguments.length, arguments)
    }
    sayHi('hi', 'hi2') */
  }
}
</script>
