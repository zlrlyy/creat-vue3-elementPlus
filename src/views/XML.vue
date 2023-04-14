<template></template>
<script lang="ts" setup>
//xml xslt 未看完
/*
创建xml
//args0 命名空间  args1 tagname  args2 documentType
let xmldom = document.implementation.createDocument('', 'root', null)
console.log(xmldom.documentElement.tagName) // "root"
let child = xmldom.createElement('child')
xmldom.documentElement.appendChild(child)

let hasXmlDom = document.implementation.hasFeature('XML', '2.0') //检查浏览器是否支持xml */

//DOMParser类 解析xml
let parser = new DOMParser()
//parseFromString 发生错误会生成<parsererror></parsererror>标签
let xmldom = parser.parseFromString('<root><child/></root>', 'text/xml')
console.log(xmldom.documentElement.tagName) // "root"
console.log(xmldom.documentElement.firstChild?.tagName) // "child"
let anotherChild = xmldom.createElement('child')
xmldom.documentElement.appendChild(anotherChild)
let children = xmldom.getElementsByTagName('child')
console.log(children.length, xmldom) // 2
//XMLSerializer类  将dom序列化为xml
let serializer = new XMLSerializer()
let xml = serializer.serializeToString(xmldom)
console.log(xml)
//根据Xpath获取值              xpath标签名      xml dom               命名空间     返回结果类型         XPathResult对象 用于填充结果
let result = xmldom.evaluate('employee/name', xmldom.documentElement, null, XPathResult.BOOLEAN_TYPE, null)
console.log(result.booleanValue)

/* XPath
命名空间处理
<?xml version="1.0" ?>
<wrox:books xmlns:wrox="http://www.wrox.com/">
 <wrox:book>
 <wrox:title>Professional JavaScript for Web Developers</wrox:title>
 <wrox:author>Nicholas C. Zakas</wrox:author>
</wrox:book>
 <wrox:book>
 <wrox:title>Professional Ajax</wrox:title>
 <wrox:author>Nicholas C. Zakas</wrox:author>
 <wrox:author>Jeremy McPeak</wrox:author>
 <wrox:author>Joe Fawcett</wrox:author>
 </wrox:book>
</wrox:books>
//一、createNSResolver 获取命名空间
let nsresolver = xmldom.createNSResolver(xmldom.documentElement);
let result = xmldom.evaluate("wrox:book/wrox:author",
 xmldom.documentElement, nsresolver,
 XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
console.log(result.snapshotLength); 
//二、
let nsresolver = function(prefix) { 
 switch(prefix) { 
 case "wrox": return "http://www.wrox.com/"; 
 // 其他前缀及返回值
 } 
}; 
let result = xmldom.evaluate("count(wrox:book/wrox:author)", 
 xmldom.documentElement, nsresolver, XPathResult.NUMBER_TYPE, null); 
console.log(result.numberValue);
*/

/* ----------------------------------------------------------
//可扩展样式表语言转换  XSLT
let processor = new XSLTProcessor()
processor.importStylesheet(xsltdom) //引入xslt dom文档
//重置并重新引入
processor.reset()
processor.importStylesheet(xsltdom2)
//更改删除参数
processor.setParameter(null, 'message', 'Hello World!')
processor.removeParameter(null, 'message2')

let result = processor.transformToDocument(xmldom) //转换为dom
console.log(serializeXml(result)) //序列化dom
//转换到另一个dom中
let fragment = processor.transformToFragment(xmldom, document)
let text = fragment.firstChild.nodeValue
console.log(text) //获取文档内容
let div = document.getElementById('divResult')
div.appendChild(fragment) */
</script>
