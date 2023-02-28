<template>
  <h1>Proxy</h1>
</template>

<script lang="ts" setup>
/*
1111111111111111111111111111111111111111111111111111
代理操作会应用于对象本身
const target = { id: "target" };
const handler = {};
const proxy = new Proxy(target, handler);
// id 属性会访问同一个值
console.log(target.id); // target
console.log(proxy.id); // target

// 给目标属性赋值会反映在两个对象上
// 因为两个对象访问的是同一个值
target.id = "foo";
console.log(target.id); // foo
console.log(proxy.id); // foo

// 给代理属性赋值会反映在两个对象上
// 因为这个赋值会转移到目标对象
proxy.id = "bar";
console.log(target.id); // bar
console.log(proxy.id); // bar

// hasOwnProperty()方法在两个地方
// 都会应用到目标对象
console.log(target.hasOwnProperty("id")); // true
console.log(proxy.hasOwnProperty("id")); // true

// // Proxy.prototype 是 undefined
// // 因此不能使用 instanceof 操作符
// console.log(target instanceof Proxy); // TypeError: Function has non-object prototype 'undefined' in instanceof check
// console.log(proxy instanceof Proxy); // TypeError: Function has non-object prototype 'undefined' in instanceof check

// 严格相等可以用来区分代理和目标
console.log(target === proxy); // false
*/

/*
22222222222222222222222222222222222222222222222222222222222222222222222222222222
代理可以在操作传播到目标对象之前先调用捕获器函数，从而拦截并修改相应的行为。
const target = { foo: "bar" };

const handler = {
  // 捕获器在处理程序对象中以方法名为键
  get() {
    return "handler override";
  },
};

const proxy = new Proxy(target, handler);

console.log(target.foo); // bar
console.log(proxy.foo); // handler override

console.log(target["foo"]); // bar
console.log(proxy["foo"]); // handler override

console.log(Object.create(target)["foo"]); // bar
console.log(Object.create(proxy)["foo"]); // handler override
 */

/* const obj = {
  name: "objname",
};

const handler = {
  get(...args:[typeof obj,any,any]) {
    return Reflect.get(...args);
  },
};
const proxy = new Proxy(obj, handler);
console.log(proxy.name); */

/*

创建一个函数 makeObservable(target)，该函数通过返回一个代理“使得对象可观察”。

其工作方式如下：

function makeObservable(target) {
  // 你的代码
}

let user = {};
user = makeObservable(user);

user.observe((key, value) => {
  alert(`SET ${key}=${value}`);
});

user.name = "John"; // alerts: SET name=John
换句话说，makeObservable 返回的对象就像原始对象一样，但是具有 observe(handler) 方法，该方法可以将 handler 函数设置为在任何属性被更改时，都会被调用的函数。

每当有属性被更改时，都会使用属性的名称和属性值调用 handler(key, value) 函数。
*/

/* 
//problem example problem example problem example problem example
let handlers = Symbol("handlers");

interface ObjProps {
  [handlers: symbol]: ((key: string | symbol, value: string) => void)[];
  observe?: (handler: (key: string | symbol, value: string) => void) => void;
  name?: string;
}

function makeObservable(obj: ObjProps) {
  obj[handlers] = [];
  obj.observe = (handler: (key: string | symbol, value: string) => void) => {
    obj[handlers].push(handler);
  };
  return new Proxy(obj, {
    set(target: ObjProps, p: string | symbol, newValue: any, receiver: any) {
      let success = Reflect.set(target, p, newValue, receiver); // 将操作转发给对象
      if (success) {
        // 如果在设置属性时没有出现 error
        // 调用所有 handler
        target[handlers].forEach((handler) => handler(p, newValue));
      }
      return success;
    },
  });
}
let user: ObjProps = {};
user = makeObservable(user);

user.observe?.((key, value) => {
  alert(`SET ${key}=${value}`);
});

user.name = "John"; */
</script>
