<template></template>
<script lang="ts" setup>
let db,
  request,
  version = 4
request = indexedDB.open('admin', version)
request.onerror = (event: Event) => {
  alert(`Failed to open: ${(event.target as any).errorCode}`)
}

request.onupgradeneeded = (event) => {
  db = (event.target as any).result
  // 如果存在则删除当前 objectStore。测试的时候可以这样做
  // 但这样会在每次执行事件处理程序时删除已有数据
  if (db.objectStoreNames.contains('users')) {
    db.deleteObjectStore('users')
  }

  db.createObjectStore('users', { keyPath: 'username' })
  console.log(db?.objectStoreNames?.contains('users'))
  console.log(123)

  const transaction = db.transaction('users'),
    store = transaction.objectStore('users'),
    request = store.get('007')
  request.onerror = (event:Event) => alert('Did not get the object!')
  request.onsuccess = (event:Event) => alert(event.target.result.firstName)
  transaction.onerror = (event:Event) => {
    // 整个事务被取消
  }
  transaction.oncomplete = (event:Event) => {
    // 整个事务成功完成
  }
}

//访问单个或多个数据库
// let transaction = db.transaction('users')
// let transaction = db.transaction(['users', 'anotherStore'])

// let transaction = db.transaction('users', 'readwrite') //"readonly"、"readwrite"或"versionchange"。
</script>
