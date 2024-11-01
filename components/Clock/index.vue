<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const timeArr = ref([])
const daysArr = ref([]) // 只存储天数

// 计算已经过去的时间
const getTimeStr = () => {
  const startTime = new Date('2023-12-01 00:00:00').getTime() // 设置起始时间
  const now = new Date().getTime()
  const diff = now - startTime

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)

  // 只返回天数
  const daysStr = ('000' + days).slice(-3).split('')
  
  // 返回完整时间
  const timeStr = [
    ...('000' + days).slice(-3).split(''),
    ...('00' + hours).slice(-2).split(''),
    ...('00' + minutes).slice(-2).split(''),
    ...('00' + seconds).slice(-2).split('')
  ]

  return { timeStr, daysStr }
}

// 处理时间数组
const getTimeArrays = () => {
  const { timeStr, daysStr } = getTimeStr()
  
  // 处理天数数组
  daysArr.value = daysStr.map((element, index) => {
    return {
      max: 9,
      current: Number(element)
    }
  })

  // 处理完整时间数组
  timeArr.value = timeStr.map((element, index) => {
    let max
    if (index === 0 || index === 1) {
      max = 9
    }
    else if (index % 2 === 0) {
      max = 9
    }
    else if (index === 3) {
      max = 2
    }
    else if (index === 5 || index === 7) {
      max = 5
    }
    return {
      max,
      current: Number(element)
    }
  })
}

let timer = null

onMounted(() => {
  getTimeArrays()
  timer = setInterval(() => {
    getTimeArrays()
  }, 1000)
})

onUnmounted(() => {
  if (timer) {
    clearInterval(timer)
  }
})
</script>

<template>
  <view class="container">
    <!-- 上方只显示天数 -->
    <view class="title">已经过去</view>
    <view class="clock-container">
      <view class="flip-container">
        <view class="flip-items" v-for="(unit, unitIndex) in daysArr" :key="'days' + unitIndex">
          <view v-for="index in unit.max + 1" :key="index" :class="[
            'item',
            unit.current === index - 1 ? 'current' : '',
            (unit.current - 1 === index - 1 || (index - 1 === unit.max && unit.current === 0)) ? 'past' : ''
          ]">
            <view class="up">
              <view class="inner">{{ index - 1 }}</view>
              <view class="shadow"></view>
            </view>
            <view class="down">
              <view class="inner">{{ index - 1 }}</view>
              <view class="shadow"></view>
            </view>
          </view>
        </view>
        <view class="unit-text">天</view>
      </view>
    </view>

    <view class="divider"></view>

    <!-- 下方显示完整时间 -->
    <view class="title">距离2023年12月1日已经过去</view>
    <view class="clock-container">
      <view class="flip-container horizontal">
        <!-- 原有的完整时间显示，添加 horizontal 类 -->
        <!-- 天 -->
        <view class="time-group">
          <view class="flip-items" v-for="(unit, unitIndex) in timeArr.slice(0, 3)" :key="'day' + unitIndex">
            <view v-for="index in unit.max + 1" :key="index" :class="[
              'item',
              unit.current === index - 1 ? 'current' : '',
              (unit.current - 1 === index - 1 || (index - 1 === unit.max && unit.current === 0)) ? 'past' : ''
            ]">
              <view class="up">
                <view class="inner">{{ index - 1 }}</view>
                <view class="shadow"></view>
              </view>
              <view class="down">
                <view class="inner">{{ index - 1 }}</view>
                <view class="shadow"></view>
              </view>
            </view>
          </view>
          <view class="unit-text">天</view>
        </view>

        <!-- 时 -->
        <view class="time-group">
          <view class="flip-items" v-for="(unit, unitIndex) in timeArr.slice(3, 5)" :key="'hour' + unitIndex">
            <view v-for="index in unit.max + 1" :key="index" :class="[
              'item',
              unit.current === index - 1 ? 'current' : '',
              (unit.current - 1 === index - 1 || (index - 1 === unit.max && unit.current === 0)) ? 'past' : ''
            ]">
              <view class="up">
                <view class="inner">{{ index - 1 }}</view>
                <view class="shadow"></view>
              </view>
              <view class="down">
                <view class="inner">{{ index - 1 }}</view>
                <view class="shadow"></view>
              </view>
            </view>
          </view>
          <view class="unit-text">时</view>
        </view>

        <!-- 分 -->
        <view class="time-group">
          <view class="flip-items" v-for="(unit, unitIndex) in timeArr.slice(5, 7)" :key="'minute' + unitIndex">
            <view v-for="index in unit.max + 1" :key="index" :class="[
              'item',
              unit.current === index - 1 ? 'current' : '',
              (unit.current - 1 === index - 1 || (index - 1 === unit.max && unit.current === 0)) ? 'past' : ''
            ]">
              <view class="up">
                <view class="inner">{{ index - 1 }}</view>
                <view class="shadow"></view>
              </view>
              <view class="down">
                <view class="inner">{{ index - 1 }}</view>
                <view class="shadow"></view>
              </view>
            </view>
          </view>
          <view class="unit-text">分</view>
        </view>

        <!-- 秒 -->
        <view class="time-group">
          <view class="flip-items" v-for="(unit, unitIndex) in timeArr.slice(7, 9)" :key="'second' + unitIndex">
            <view v-for="index in unit.max + 1" :key="index" :class="[
              'item',
              unit.current === index - 1 ? 'current' : '',
              (unit.current - 1 === index - 1 || (index - 1 === unit.max && unit.current === 0)) ? 'past' : ''
            ]">
              <view class="up">
                <view class="inner">{{ index - 1 }}</view>
                <view class="shadow"></view>
              </view>
              <view class="down">
                <view class="inner">{{ index - 1 }}</view>
                <view class="shadow"></view>
              </view>
            </view>
          </view>
          <view class="unit-text">秒</view>
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped>
.container {
  padding: 20rpx;
}

.title {
  text-align: center;
  font-size: 28rpx;
  color: #333;
  margin-bottom: 20rpx;
  font-weight: bold;
}

.divider {
  height: 2rpx;
  background-color: #eee;
  margin: 40rpx 0;
}

.flip-container {
  display: flex;
  justify-content: center;
  position: relative;
  padding: 0 20rpx;
}

.flip-items {
  position: relative;
  width: 40rpx;
  height: 60rpx;
  font-size: 40rpx;
  font-weight: bold;
  border-radius: 6rpx;
  border: 1rpx solid rgba(121, 121, 121, 0.384);
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.7);
}

.horizontal {
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  gap: 10rpx;
}

.time-group {
  display: flex;
  align-items: center;
  margin: 0 5rpx;
}

.item {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
}

.item::before {
  position: absolute;
  content: '';
  top: 30rpx;
  width: 100%;
  height: 3rpx;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9;
}

.up, .down {
  position: absolute;
  left: 0;
  right: 0;
  height: 50%;
  overflow: hidden;
}

.up {
  transform-origin: 50% 100%;
  top: 0;
}

.down {
  transform-origin: 50% 0%;
  bottom: 0;
}

.inner {
  position: absolute;
  width: 100%;
  height: 60rpx;
  color: #252525;
  left: 0;
  line-height: 60rpx;
  text-align: center;
  text-shadow: 0 2rpx 4rpx rgb(0, 0, 0);
  border-radius: 8rpx;
  background-color: #55e3e3;
}

.up .inner {
  top: 0;
}

.down .inner {
  bottom: 0;
}

.shadow {
  position: absolute;
  width: 100%;
  height: 100%;
}

.item.past {
  z-index: 3;
}

.item.current {
  animation: highter-level 0.5s 0.5s linear forwards;
  z-index: 2;
}

.item.past .up {
  animation: flip-past-up 0.5s linear both;
}

.item.current .down {
  animation: flip-current-down 0.5s 0.5s linear both;
}

.item.past .up .shadow {
  background: linear-gradient(rgba(0, 0, 0, 0.1) 0%, #000 100%);
  animation: show 0.5s linear both;
}

.item.past .down .shadow {
  background: linear-gradient(#000 0%, rgba(0, 0, 0, 0.1) 100%);
  animation: show 0.5s linear both;
}

.item.current .up .shadow {
  background: linear-gradient(rgba(0, 0, 0, 0.1) 0%, #000 100%);
  animation: hide 0.5s 0.3s linear both;
}

.item.current .down .shadow {
  background: linear-gradient(#000 0%, rgba(0, 0, 0, 0.1) 100%);
  animation: hide 0.5s 0.3s linear both;
}

.unit-text {
  font-size: 24rpx;
  color: #333;
  margin: 0 5rpx;
  font-weight: bold;
}

@keyframes flip-current-down {
  from {
    transform: rotateX(90deg);
  }
  to {
    transform: rotateX(0deg);
  }
}

@keyframes flip-past-up {
  from {
    transform: rotateX(0deg);
  }
  to {
    transform: rotateX(-90deg);
  }
}

@keyframes highter-level {
  from {
    z-index: 4;
  }
  to {
    z-index: 4;
  }
}

@keyframes show {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes hide {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

/* 调整分隔点的大小和位置 */
.flip-container .flip-items:nth-child(2)::after,
.flip-container .flip-items:nth-child(4)::after,
.flip-container .flip-items:nth-child(2)::before,
.flip-container .flip-items:nth-child(4)::before {
  width: 12rpx;
  height: 12rpx;
  right: -8rpx;
}

/* 调整间距 */
.flip-container .flip-items:nth-child(2n+1) {
  margin-right: 4rpx;
}

.flip-container .flip-items:nth-child(2),
.flip-container .flip-items:nth-child(4) {
  margin-right: 16rpx;
}

/* 上方天数的样式 */
.clock-container:first-child .flip-items {
  width: 120rpx;
  height: 180rpx;
  font-size: 120rpx;
  border-radius: 12rpx;
  box-shadow: 0 4rpx 24rpx rgba(0, 0, 0, 0.8);
  margin-right: 2rpx;
}

.clock-container:first-child .inner {
  height: 180rpx;
  line-height: 180rpx;
  font-size: 120rpx;
  border-radius: 12rpx;
}

.clock-container:first-child .item::before {
  top: 90rpx;
  height: 4rpx;
}

.clock-container:first-child .unit-text {
  font-size: 48rpx;
  margin: 0 20rpx;
}

/* 专门调整上方数字间距 */
.clock-container:first-child .flip-items:not(:last-child) {
  margin-right: 4rpx;
}

/* 调整上方标题样式 */
.clock-container:first-child + .title,
.title:first-child {
  font-size: 40rpx;
  margin-bottom: 40rpx;
}

/* 增加分隔线的间距 */
.divider {
  margin: 80rpx 0;
}
</style>