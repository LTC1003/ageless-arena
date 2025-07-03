/**
* @description: 个人中心
* @author: ltc 
**/
<template>
  <view class="myInfo-container">
    <view class="user-info">
      <image src="https://cdn.uviewui.com/uview/example/logo.png" mode=""></image>
      <view class="user-info-text">
        <text>{{ userInfo.username }}</text>
        <text>积分：{{ userInfo.Integral }}</text>
        <text>余额：{{ userInfo.purse }}</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Taro from '@tarojs/taro'
const pageInit = () => {
  Taro.showLoading({
    title: '加载中...'
  })
  setTimeout(() => {
    Taro.hideLoading()
  }, 1000)
}
const userInfo = ref(null)

onMounted(() => {
    userInfo.value = {
        username: 'ltc',
        Integral: 0,
        // avatar: 'https://cdn.uviewui.com/uview/example/logo.png',
        purse: 0,
    }
    // userInfo.value = Taro.getStorageSync('userInfo')
    // pageInit()
})

</script>

<style lang="scss">
.mall-container {
    padding: 20rpx;
}
</style>