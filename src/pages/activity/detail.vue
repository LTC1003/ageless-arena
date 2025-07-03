/**
* @description: 活动报名
* @author: ltc 
**/
<template>
  <view class="detail-container">
    <!-- 活动头图 -->
    <image :src="activityDetail.image" class="banner" mode="widthFix" />
    
    <!-- 活动基本信息 -->
    <view class="info-section">
      <text class="title">{{ activityDetail.title }}</text>
      <view class="meta">
        <text class="time">活动时间: {{ activityDetail.time }}</text>
        <text class="location">活动地点: {{ activityDetail.location }}</text>
      </view>
    </view>
    
    <!-- 活动详情介绍 -->
    <view class="content-section">
      <text class="section-title">活动详情</text>
      <text class="content">{{ activityDetail.content }}</text>
    </view>
    
    <!-- 底部报名按钮 -->
    <view class="footer">
      <button class="signup-btn" @tap="handleSignup">立即报名</button>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Taro, { useRouter, onPullDownRefresh } from '@tarojs/taro'

// import iconSolo from '../../assets/icons/icon_solo.png'

// 获取路由参数（分类ID）
// const $instance = Taro.getCurrentInstance()
// const categoryId = ref($instance.router.params.categoryId)
const router = useRouter();
console.log(router, 'instance.router.params.categoryId')
const activityId = ref(router.params.activityId)

// 活动详情数据
const activityDetail = ref({
  id: 1,
  title: '夏日文化艺术交流节',
  image: 'https://img.dahepiao.com/uploads/allimg/210409/57066-o5w7GXZ0iUqwa.png',
  time: '2023-08-15 至 2023-08-20',
  location: '南京文工团全国文化艺术中心',
  content: '本次合唱团欢节将汇集上海、江苏、浙江、安徽、成都和北京等80多个城市，高等文化以及文工团骨干，文艺的交流，欢迎大家到来！。'
})

// 报名处理
const handleSignup = () => {
  // Taro.showToast({
  //   title: '报名成功',
  //   icon: 'success',
  //   duration: 2000
  // })
  Taro.navigateTo({
    url: `/pages/signup/index?activityId=${activityId.value}`
  })
  // 实际项目中可跳转到报名页
  //  url: `/pages/signup/index?activityId=${activityId.value}`
}

// // 下拉刷新处理
// onPullDownRefresh(() => {
//   fetchActivityDetail().finally(() => {
//     Taro.stopPullDownRefresh()
//   })
// })

// // 获取活动详情
// const fetchActivityDetail = () => {
//   return new Promise(resolve => {
//     console.log('重新加载活动详情')
//     // 模拟API请求
//     setTimeout(() => {
//       resolve()
//       // 更新活动详情
//     }, 1000)
//   })
// }

// 根据ID获取活动详情（实际项目应调用API）
onMounted(() => {
  console.log('加载活动详情:', activityId.value)
  // 这里应替换为API请求
})
</script>

<style>
.detail-container {
  padding-bottom: 100rpx;
}

.banner {
  width: 100%;
}

.info-section {
  padding: 30rpx;
  background: #fff;
}

.title {
  font-size: 40rpx;
  font-weight: bold;
  margin-bottom: 20rpx;
  display: block;
}

.meta {
  display: flex;
  flex-direction: column;
  color: #666;
  font-size: 28rpx;
}

.content-section {
  padding: 30rpx;
  background: #fff;
  margin-top: 20rpx;
}

.section-title {
  font-size: 32rpx;
  font-weight: bold;
  margin-bottom: 20rpx;
  display: block;
}

.content {
  font-size: 28rpx;
  line-height: 1.6;
}

.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  padding: 20rpx;
  box-shadow: 0 -2rpx 10rpx rgba(0,0,0,0.1);
}

.signup-btn {
  background: #07c160;
  color: white;
  border-radius: 50rpx;
}
</style>