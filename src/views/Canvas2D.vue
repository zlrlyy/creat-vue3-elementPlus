<template>
  <canvas id="drawing" width="300" height="300">A drawing of something.</canvas>
</template>
<script lang="ts" setup>
import { onMounted } from 'vue'

/*
绘制矩形并导出img
onMounted(() => {
  let drawing = document.getElementById('drawing') as HTMLCanvasElement
  // 确保浏览器支持<canvas>
  if (drawing?.getContext) {
    let context = drawing.getContext('2d')
    if (!context) return
    context.strokeStyle = 'red'
    context.lineWidth = 2
    //lineCap 属性控制线条端点的形状［"butt"（平头）、"round"（出圆头）或"square"（出方头）］
    context.lineCap = 'square'
    //而 lineJoin属性控制线条交点的形状［"round"（圆转）、"bevel"（取平）或"miter"（出尖）］
    context.lineJoin = 'round'
    context.strokeRect(0, 0, 50, 50)

    context.fillStyle = '#ff0000'
    context.fillRect(10, 10, 50, 50)

    context.fillStyle = 'rgba(0,0,255,0.5)'
    context.fillRect(30, 30, 50, 50)

    // 在前两个矩形重叠的区域擦除一个矩形区域
    context.clearRect(40, 40, 10, 10)
    // 其他代码
    let imgURI = drawing.toDataURL('image/png')
    // 显示图片
    let image = document.createElement('img')
    image.src = imgURI
    document.body.appendChild(image)
  }
}) */

/*
回到起点  绘制曲线
onMounted(() => {
  const canvas = document.getElementById('drawing') as HTMLCanvasElement
  if (canvas?.getContext) {
    const context = canvas.getContext('2d')
    if (!context) return
    // 创建路径
    context.beginPath()
    context.moveTo(0, 0)
    context.lineTo(100, 100)
    context.lineTo(200, 100)

    context.moveTo(0, 100)
    context.lineTo(200, 100)
    context.arcTo(100, 0, 0, 100, 141)
    //返回起点
    context.closePath()
    // 描画路径
    context.stroke()
    //按路径填充
    // context.fill()
    //判断点是否在路径上
    if (context.isPointInPath(0, 0)) {
      alert('Point (100, 100) is in the path.')
    }
  }
}) */

/*
绘制会旋转的时钟 带文字
onMounted(() => {
  const canvas = document.getElementById('drawing') as HTMLCanvasElement
  if (canvas?.getContext) {
    const context = canvas.getContext('2d')
    if (!context) return
    // 创建路径
    context.beginPath()
    // 绘制外圆
    context.arc(100, 100, 99, 0, 2 * Math.PI, false)
    // 绘制内圆
    context.moveTo(194, 100)
    context.arc(100, 100, 94, 0, 2 * Math.PI, false)
    // 移动原点到表盘中心
    context.translate(100, 100)
    // 旋转表针
    context.rotate(1)
    // 绘制分针
    context.moveTo(0, 0)
    context.lineTo(0, -85)
    // 绘制时针
    context.moveTo(0, 0)
    context.lineTo(-65, 0)
    // 描画路径
    context.stroke()
    //绘制文字
    context.font = 'bold 14px Arial'
    context.textAlign = 'center'
    context.textBaseline = 'middle'
    context.fillText('12', 0, -80)
  }
}) */

/*
保存与撤销
onMounted(() => {
  const canvas = document.getElementById('drawing') as HTMLCanvasElement
  if (canvas?.getContext) {
    const context = canvas.getContext('2d')
    if (!context) return
    // 创建路径
    context.fillStyle = '#ff0000'
    context.save()
    context.fillStyle = '#00ff00'
    context.translate(100, 100)
    context.save()
    context.fillStyle = '#0000ff'
    context.fillRect(0, 0, 100, 200) // 在(100, 100)绘制蓝色矩形
    context.restore()
    context.fillRect(10, 10, 100, 200) // 在(100, 100)绘制绿色矩形
    context.restore()
    context.fillRect(0, 0, 100, 200)
  }
}) */
/*
// 绘制图像
onMounted(() => {
  const canvas = document.getElementById('drawing') as HTMLCanvasElement
  if (canvas?.getContext) {
    const context = canvas.getContext('2d')
    if (!context) return
    // 创建路径
    const img = new Image()
    img.src = 'img/img1.jpg'
    //这一部分从(0, 10)开始，50 像素宽、50 像素高。而绘制到画布上时，会从(0, 100)开始，变成 40 像素宽、60 像素高。
    img.onload = () => {
      var scale = Math.min(canvas.width / img.width, canvas.height / img.height)
      // 计算绘制图片的起始点
      var x = canvas.width / 2 - (img.width / 2) * scale
      var y = canvas.height / 2 - (img.height / 2) * scale
      // 绘制图片
      context.drawImage(img, 0, 0, img.width, img.height, x, y, img.width * scale, img.height * scale)
    }
  }
}) */

/*
阴影
onMounted(() => {
  const canvas = document.getElementById('drawing') as HTMLCanvasElement
  if (canvas?.getContext) {
    const context = canvas.getContext('2d')
    if (!context) return
    context.shadowOffsetX = 5
    context.shadowOffsetY = 5
    context.shadowBlur = 4
    context.shadowColor = 'rgba(0, 0, 0, 0.5)'

    // 绘制红色矩形
    context.fillStyle = '#ff0000'
    context.fillRect(10, 10, 50, 50)
    // 绘制蓝色矩形
    context.fillStyle = 'rgba(0,0,255,1)'
    context.fillRect(30, 30, 50, 50)
  }
}) */

/*
直线渐变
onMounted(() => {
  const canvas = document.getElementById('drawing') as HTMLCanvasElement
  if (canvas?.getContext) {
    const context = canvas.getContext('2d')
    if (!context) return
    let gradient = context.createLinearGradient(30, 30, 70, 70)
    gradient.addColorStop(0, 'white')
    gradient.addColorStop(1, 'black')
    // 绘制红色矩形
    context.fillStyle = '#ff0000'
    context.fillRect(10, 10, 50, 50)
    // 绘制渐变矩形
    context.fillStyle = gradient
    context.fillRect(30, 30, 50, 50)
  }
}) */
/*
径向渐变
onMounted(() => {
  const canvas = document.getElementById('drawing') as HTMLCanvasElement
  if (canvas?.getContext) {
    const context = canvas.getContext('2d')
    if (!context) return
    let gradient = context.createRadialGradient(55, 55, 10, 55, 55, 30)
    gradient.addColorStop(0, 'white')
    gradient.addColorStop(1, 'black')
    // 绘制红色矩形
    context.fillStyle = '#ff0000'
    context.fillRect(10, 10, 50, 50)
    // 绘制渐变矩形
    context.fillStyle = gradient
    context.fillRect(30, 30, 50, 50)
  }
}) */

/* //改变图片大小
function resizeImage(img: HTMLImageElement, maxWidth: number, maxHeight: number) {
  var canvas2 = document.createElement('canvas')
  var ctx = canvas2.getContext('2d')
  var width = img.width
  var height = img.height
  // 计算缩放比例
  var scale = Math.min(maxWidth / width, maxHeight / height)
  // 计算缩小后的尺寸
  var newWidth = width * scale
  var newHeight = height * scale
  canvas2.width = newWidth
  canvas2.height = newHeight
  // 绘制缩小后的图片
  ctx?.drawImage(img, 0, 0, newWidth, newHeight)
  return canvas2.toDataURL()
}

//重复图案绘制
onMounted(() => {
  const canvas = document.getElementById('drawing') as HTMLCanvasElement
  if (canvas?.getContext) {
    const context = canvas.getContext('2d')
    if (!context) return

    const img: HTMLImageElement = new Image()
    img.src = 'img/img1.jpg'

    img.onload = () => {
      //改变图片大小
      var newImg = new Image()
      newImg.src = resizeImage(img, 100, 100)

      newImg.onload = () => {
        const pattern = context.createPattern(newImg, 'repeat')
        context.fillStyle = pattern!
        context.fillRect(0, 0, 300, 300)
      }
    }
  }
}) */

/* 
//获取image数据信息
onMounted(() => {
  const canvas = document.getElementById('drawing') as HTMLCanvasElement
  if (canvas?.getContext) {
    const context = canvas.getContext('2d')
    if (!context) return
    let image = new Image(),
      imageData,
      data,
      i,
      len,
      average,
      red,
      green,
      blue,
      alpha
    image.src = 'img/img1.jpg'
    // 绘制图像
    image.onload = () => {
      context.drawImage(image, 0, 0)
      // 取得图像数据
      imageData = context.getImageData(0, 0, image.width, image.height)
      data = imageData.data
      console.log(data)

      for (i = 0, len = data.length; i < len; i += 4) {
        red = data[i]
        green = data[i + 1]
        blue = data[i + 2]
        alpha = data[i + 3]
        // 取得 RGB 平均值
        average = Math.floor((red + green + blue) / 3)
        // 设置颜色，不管透明度
        data[i] = average
        data[i + 1] = average
        data[i + 2] = average
      }
      // 将修改后的数据写回 ImageData 并应用到画布上显示出来
      imageData.data = data
      context.putImageData(imageData, 0, 0)
    }
  }
}) */

/* 
透明度
onMounted(() => {
  const canvas = document.getElementById('drawing') as HTMLCanvasElement
  if (canvas?.getContext) {
    const context = canvas.getContext('2d')
    if (!context) return
    // 绘制红色矩形
    context.fillStyle = '#ff0000'
    context.fillRect(10, 10, 50, 50)
    // 修改全局透明度
    context.globalAlpha = 0.5
    // 绘制蓝色矩形
    context.fillStyle = 'rgba(0,0,255,1)'
    context.fillRect(30, 30, 50, 50)
    // 重置
    context.globalAlpha = 0
  }
}) */
onMounted(() => {
  const canvas = document.getElementById('drawing') as HTMLCanvasElement
  if (canvas?.getContext) {
    const context = canvas.getContext('2d')
    if (!context) return
    // 绘制红色矩形
    context.fillStyle = '#ff0000'
    context.fillRect(10, 10, 50, 50)
    // 设置合成方式
    context.globalCompositeOperation = 'xor'
    // 绘制蓝色矩形
    context.fillStyle = 'rgba(0,0,255,1)'
    context.fillRect(30, 30, 50, 50)
  }
})
</script>
