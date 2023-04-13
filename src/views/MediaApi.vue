<template>
  <!-- poster未加载成功时显示的图片 controls是否可控制 -->
  <video id="myVideo" poster="" controls>
    <!-- 不同格式视频 -->
    <source src="conference.webm" type="video/webm; codecs='vp8, vorbis'" />
    <source src="conference.ogv" type="video/ogg; codecs='theora, vorbis'" />
    <source src="conference.mpg" />
    <!--不可用时显示文字-->
    Video player not available.
  </video>
  <input type="file" id="file" />
  <div class="video">
    <video id="player" src="">Video player not available.</video>
  </div>
  <div class="controls">
    <input type="button" value="Play" id="video-btn" />
    <span id="curtime">0</span>/<span id="duration">0</span>
  </div>
</template>
<script lang="ts" setup>
import { onMounted } from 'vue'
onMounted(() => {
  // 取得元素的引用
  let player = document.getElementById('player') as HTMLVideoElement,
    btn = document.getElementById('video-btn') as HTMLInputElement,
    curtime = document.getElementById('curtime'),
    duration = document.getElementById('duration'),
    targetFile
  const reader = new FileReader(),
    file = document.getElementById('file')
  if (!player || !btn || !curtime || !duration || !file) return
  file.addEventListener('change', (event) => {
    targetFile = (event.target as HTMLInputElement).files![0]
    reader.readAsDataURL(targetFile)
  })
  reader.onload = () => {
    player.src = reader.result as string
    player.onloadedmetadata = () => {
      // 更新时长
      duration!.innerHTML = String(player.duration)
      // 为按钮添加事件处理程序
      btn.addEventListener('click', (event) => {
        if (player.paused) {
          player.play()
          btn!.value = 'Pause'
        } else {
          player.pause()
          btn!.value = 'Play'
        }
      })
    }
  }

  // 周期性更新当前时间
  setInterval(() => {
    curtime!.innerHTML = String(player.currentTime)
  }, 250)

  let audio = new Audio('/public/test.mp3')
  audio.addEventListener('canplaythrough', (event) => {
    audio.play()
  })
  /*
 判断是否可以使用
 let audio = document.getElementById('audio-player')
  // 很可能是"maybe"
  if (audio.canPlayType('audio/mpeg')) {
    // 执行某些操作
  }
  // 可能是"probably"
  if (audio.canPlayType('audio/ogg; codecs="vorbis"')) {
    // 执行某些操作
  } */
})
</script>
