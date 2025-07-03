<template>
  <view class="container">
    <!-- 轮播图区域 -->
    <swiper 
      class="swiper" 
      indicator-dots 
      autoplay
      circular
      :interval="5000"
      duration
      indicator-color="rgba(0,0,0,0.3)"
      indicator-active-color="#07c160">
      <swiper-item v-for="(item, index) in hotActivities" :key="index">
        <image 
          :src="item.image" 
          mode="aspectFill"
          @tap="navigateToActivity(item.id)"/>
        <text class="banner-title">{{ item.title }}</text>
      </swiper-item>
    </swiper>

    <!-- 活动分类区域 -->
    <view class="category-section">
      <text class="section-title">活动分类</text>
      <view class="category-grid">
        <view 
          v-for="(category, idx) in categories" 
          :key="idx"
          class="category-item"
          @tap="navigateToCategory(category.id)">
          <image :src="category.icon" class="category-icon" />
          <text>{{ category.name }}</text>
        </view>
      </view>
    </view>
    <!-- 最新公告 -->
    <view class="announcement">
      <text class="announcement-label">最新公告：</text>
      <swiper class="announcement-swiper" vertical autoplay circular>
        <swiper-item v-for="(notice, idx) in notices" :key="idx">
          <text class="notice-text">{{ notice.msg }}</text>
        </swiper-item>
      </swiper>
    </view>
    <!-- 报名按钮 -->
    <!-- <view class="signup-btn-container">
      <button class="signup-btn" @tap="goToSignup">立即报名</button>
    </view> -->
  </view>
</template>

<script setup>
// import './index.scss'
import { ref } from 'vue'
import Taro from '@tarojs/taro'

// import Counter from '../../components/Counter.vue'
// 静态资源图标
import iconSolo from '../../assets/icons/icon_solo.png'
import iconChorus from '../../assets/icons/icon_chorus.png'
import iconDance from '../../assets/icons/icon_dance.png'
import iconFashion from '../../assets/icons/icon_fashion.png'
import iconInstrument from '../../assets/icons/icon_instrument.png'
import imagesBanner1 from '../../assets/images/banner1.jpg'
import imagesBanner2 from '../../assets/images/banner2.jpg'
import imagesBanner3 from '../../assets/images/banner3.jpg'

// 模拟热门活动数据
const hotActivities = ref([
  { id: 1, image: imagesBanner1, title: '夏日电竞狂欢节' },
  { id: 2, image: imagesBanner2, title: '英雄联盟城市争霸赛' },
  { id: 3, image: imagesBanner3, title: '王者荣耀全国大赛' }
])

// 模拟活动分类数据
const categories = ref([
  { id: 1, name: '独唱', icon: iconSolo, path: '/assets/game.png' },
  { id: 2, name: '合唱', icon: iconChorus, path: '/assets/sports.png' },
  { id: 3, name: '舞蹈', icon: iconDance, path: '/assets/culture.png' },
  { id: 4, name: '乐器', icon: iconFashion, path: '/assets/music.png' },
  { id: 5, name: '时装秀', icon: iconInstrument, path: '/assets/edu.png' }
])

const notices = ref([
  {id: 1, msg:'报名截止日期延至10月30日'},
  {id: 2, msg:'器乐比赛新增电子琴组别'},
  {id: 3, msg:'决赛场地变更为市艺术中心'},
])

// 跳转到活动详情
const navigateToActivity = (id) => {
  Taro.navigateTo({
    url: `/pages/activity/detail?id=${id}`
  })
}

// 跳转到分类活动（后续可扩展）
const navigateToCategory = (categoryId) => {
  // Taro.navigateTo({
  //   url: `/pages/activity/list`,
  // })
  Taro.navigateTo({
    url: `/pages/activity/list?categoryId=${categoryId}`,
    success: function (res) { 
      console.log(categoryId, 'navigateToCategory success')
      // Taro.hideLoading()
    },
    fail: function (res) { 
      console.log(categoryId, 'navigateToCategory fail')
      // Taro.hideLoading()
      // Taro.showToast({
      //   title: '跳转失败',
      //   icon: 'error',
      //   duration: 2000
      // })
      console.error('跳转失败:', err)
    },
  })
}

</script>
<style lang="scss">
.container {
  padding: 20rpx;
}

.swiper {
  height: 400rpx;
  border-radius: 16rpx;
  overflow: hidden;
}

swiper image {
  width: 100%;
  height: 100%;
}

.category-section {
  margin-top: 40rpx;
}

.section-title {
  font-size: 36rpx;
  font-weight: bold;
  margin-bottom: 20rpx;
  display: block;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20rpx;
}

.category-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.category-icon {
  width: 80rpx;
  height: 80rpx;
  margin-bottom: 10rpx;
}

.announcement {
  margin: 30rpx 0;
  display: flex;
  align-items: center;
  background: #f5f7fa;
  padding: 20rpx;
  border-radius: 12rpx;
  
  &-label {
    font-weight: bold;
    margin-right: 20rpx;
    white-space: nowrap;
  }
  
  &-swiper {
    height: 40rpx;
    flex: 1;
    
    .notice-text {
      font-size: 28rpx;
      line-height: 40rpx;
    }
  }
}

.signup-btn-container {
  margin: 50rpx auto;
  width: 80%;
  
  .signup-btn {
    background: linear-gradient(90deg, #ff5e3a, #ff2a68);
    color: white;
    border-radius: 50rpx;
    font-size: 32rpx;
    font-weight: bold;
    box-shadow: 0 8rpx 20rpx rgba(255, 46, 104, 0.3);
  }
}

</style>