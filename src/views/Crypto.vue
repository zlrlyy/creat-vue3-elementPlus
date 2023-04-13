<template></template>
<script lang="ts" setup>
const array = new Uint8Array(300)
console.log(crypto.getRandomValues(array)) //随机填充定型数组  数组最大值取决于定型数组的类  2**8
//---------------------------------------------------------------------------------------
function randomFloat() {
  // 生成 32 位随机值
  const fooArray = new Uint32Array(1)
  // 最大值是 2^32 –1
  const maxUint32 = 0xffffffff
  // 用最大可能的值来除
  return crypto.getRandomValues(fooArray)[0] / maxUint32
}
console.log(randomFloat())
//---------------------------------------------------------------------------------------
;(async function () {
  const textEncoder = new TextEncoder()
  const message = textEncoder.encode('test')
  const messageDigest = await crypto.subtle.digest('SHA-256', message)
  console.log(new Uint32Array(messageDigest), messageDigest)
  //通常，在使用时，二进制的消息摘要会转换为十六进制字符串格式
  const hexDigest = Array.from(new Uint8Array(messageDigest))
    .map((x) => x.toString(16).padStart(2, '0'))
    .join('')
  console.log(hexDigest)
})()
//------------------验证文件签名-----------------------
;(async function () {
  const mozillaCdnUrl = '// download-origin.cdn.mozilla.net/pub/firefox/releases/67.0 /'
  const firefoxBinaryFilename = 'linux-x86_64/en-US/firefox-67.0.tar.bz2'
  const firefoxShaFilename = 'SHA512SUMS'
  console.log('Fetching Firefox binary...')
  const fileArrayBuffer = await (await fetch(mozillaCdnUrl + firefoxBinaryFilename)).arrayBuffer()
  console.log('Calculating Firefox digest...')
  const firefoxBinaryDigest = await crypto.subtle.digest('SHA-512', fileArrayBuffer)
  const firefoxHexDigest = Array.from(new Uint8Array(firefoxBinaryDigest))
    .map((x) => x.toString(16).padStart(2, '0'))
    .join('')
  console.log('Fetching published binary digests...')
  // SHA 文件包含此次发布的所有 Firefox 二进制文件的摘要，
  // 因此要根据其格式进制拆分
  const shaPairs = (await (await fetch(mozillaCdnUrl + firefoxShaFilename)).text())
    .split(/\n/)
    .map((x) => x.split(/\s+/)) //匹配空格字符
  let verified = false
  console.log('Checking calculated digest against published digests...')
  for (const [sha, filename] of shaPairs) {
    if (filename === firefoxBinaryFilename) {
      if (sha === firefoxHexDigest) {
        verified = true
        break
      }
    }
  }
  console.log('Verified:', verified)
})
//-------支持 ECDSA 算法;使用 P-256 椭圆曲线;不能从 CryptoKey 对象中提取;可以跟 encrypt()和 decrypt()方法一起使用。
;(async function () {
  const params: EcKeyGenParams = {
    name: 'ECDSA',
    namedCurve: 'P-256'
  }
  const keyUsages = ['sign', 'verify']
  const key = await crypto.subtle.generateKey(params, false, keyUsages)
  console.log(key)
  // CryptoKey {type: "secret", extractable: true, algorithm: {...}, usages: Array(2)}
})()
//--------------使用exportKey()方法并指定目标格式（"raw"、"pkcs8"、"spki"或"jwk"）就可以取得密钥-------------
;(async function () {
  const params = {
    name: 'AES-CTR',
    length: 128
  }
  const keyUsages = ['encrypt', 'decrypt']
  const key = await crypto.subtle.generateKey(params, true, keyUsages)
  const rawKey = await crypto.subtle.exportKey('raw', key) //导出密钥
  // const importedKey = await crypto.subtle.importKey(keyFormat, rawKey, params.name, isExtractable, keyUsages);  导入密钥
  console.log(new Uint8Array(rawKey))
  // Uint8Array[93, 122, 66, 135, 144, 182, 119, 196, 234, 73, 84, 7, 139, 43, 238,
  // 110]
})()
//--------------------非对称加密验证签名------------------
;(async function () {
  const keyParams = {
    name: 'ECDSA',
    namedCurve: 'P-256'
  }
  const keyUsages = ['sign', 'verify']
  const { publicKey, privateKey } = await crypto.subtle.generateKey(keyParams, true, keyUsages)
  const message = new TextEncoder().encode('I am Satoshi Nakamoto')
  const signParams = {
    name: 'ECDSA',
    hash: 'SHA-256'
  }
  //生成签名  arg0 公钥算法  arg1 私钥  arg2 message值
  const signature = await crypto.subtle.sign(signParams, privateKey, message)
  console.log(new Uint32Array(signature))
  // Uint32Array(16) [2202267297, 698413658, 1501924384, 691450316, 778757775, ... ]
})()
;(async function () {
  const keyParams = {
    name: 'ECDSA',
    namedCurve: 'P-256'
  }
  const keyUsages = ['sign', 'verify']
  const { publicKey, privateKey } = await crypto.subtle.generateKey(keyParams, true, keyUsages)
  const message = new TextEncoder().encode('I am Satoshi Nakamoto')
  const signParams = {
    name: 'ECDSA',
    hash: 'SHA-256'
  }
  const signature = await crypto.subtle.sign(signParams, privateKey, message)
  //验证签名   arg0 公钥算法  arg1 公钥  arg2 签名  arg3 message值
  const verified = await crypto.subtle.verify(signParams, publicKey, signature, message)
  console.log(verified) // true
})()
//-----------------------对称加密 加密与解密-----------------
;(async function () {
  const algoIdentifier = 'AES-CBC'
  const keyParams = {
    name: algoIdentifier,
    length: 256
  }
  const keyUsages = ['encrypt', 'decrypt']
  const key = await crypto.subtle.generateKey(keyParams, true, keyUsages)
  const originalPlaintext = new TextEncoder().encode('I am Satoshi Nakamoto')
  const encryptDecryptParams = {
    name: algoIdentifier,
    iv: crypto.getRandomValues(new Uint8Array(16))
  }
  //加密   arg0 算法  arg1 密钥  arg2  值
  const ciphertext = await crypto.subtle.encrypt(encryptDecryptParams, key, originalPlaintext)
  console.log(ciphertext)
  // ArrayBuffer(32) {}
  //解密   arg0 算法  arg1 密钥  arg2  加密值
  const decryptedPlaintext = await crypto.subtle.decrypt(encryptDecryptParams, key, ciphertext)
  console.log(new TextDecoder().decode(decryptedPlaintext))
  // I am Satoshi Nakamoto
})()
//----------------------包装、解包密钥------------------------
;(async function () {
  const keyFormat = 'raw'
  const extractable = true
  const wrappingKeyAlgoIdentifier = 'AES-KW'
  const wrappingKeyUsages = ['wrapKey', 'unwrapKey'] //包装 解包
  const wrappingKeyParams = {
    name: wrappingKeyAlgoIdentifier,
    length: 256
  }
  const keyAlgoIdentifier = 'AES-GCM'
  const keyUsages = ['encrypt']
  const keyParams = {
    name: keyAlgoIdentifier,
    length: 256
  }
  const wrappingKey = await crypto.subtle.generateKey(wrappingKeyParams, extractable, wrappingKeyUsages)
  console.log(wrappingKey)
  // CryptoKey {type: "secret", extractable: true, algorithm: {...}, usages: Array(2)}
  const key = await crypto.subtle.generateKey(keyParams, extractable, keyUsages)
  console.log(key)
  // CryptoKey {type: "secret", extractable: true, algorithm: {...}, usages: Array(1)}
  //包装   arg0 目标格式（"raw"、"pkcs8"、"spki"或"jwk"）  arg1 密钥  arg2  包装密钥  arg3 指定算法及必要值
  const wrappedKey = await crypto.subtle.wrapKey(keyFormat, key, wrappingKey, wrappingKeyAlgoIdentifier)
  console.log(wrappedKey)
  // ArrayBuffer(40) {}
  //包装   arg0 目标格式（"raw"、"pkcs8"、"spki"或"jwk"）  arg1 包装结果密钥  arg2  包装密钥  arg3 解密算法。。。。
  const unwrappedKey = await crypto.subtle.unwrapKey(
    keyFormat,
    wrappedKey,
    wrappingKey,
    wrappingKeyParams,
    keyParams,
    extractable,
    keyUsages
  )
  console.log(unwrappedKey)
  // CryptoKey {type: "secret", extractable: true, algorithm: {...}, usages: Array(1)}
})()
</script>
