const template = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <template id="foo">
      <p>1321312312</p>
      <script>console.log('Template script executed');</script>  
    </template>
    <div id="myDiv"></div>
  </body>
  <script>
    const fragment = document.querySelector('#foo').content
    console.log(fragment) // #document-fragment
    console.log(document.querySelector('p')) // null
    console.log(fragment.querySelector('p')) // <p>...<p>

    const div = document.querySelector('#myDiv')
    //div.appendChild(fragment); //剪切fragment
    //插入脚本可延迟脚本执行
    div.appendChild(document.importNode(fragment,true))  //document.importNode复制节点  args[0]为节点  args[1]为deep 
    console.log(document.body.innerHTML);
  </script>
</html>`
export default template