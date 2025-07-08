<template>
  <view class="container">
    <!-- 轮播图区域 -->
    <swiper 
      class="swiper" 
      indicator-dots 
      :autoplay="true"
      :circular="true"
      interval="5000" 
      duration="500"
      indicator-color="rgba(0,0,0,0.3)"
      indicator-active-color="#07c160">
      <swiper-item v-for="(item, index) in hotActivities" :key="index">
        <image 
          :src="item.image"
          mode="aspectFill"
          alt="图片加载失败"
          @tap="navigateToActivity(item.id)"/>
        <text class="banner-title">{{ item.title }}</text>
      </swiper-item>
    </swiper>
    <!-- 积分兑换区域 -->
    <view class="integral-exchange-section">
      <text class="section-title">积分兑换</text>
      <view class="integral-exchange-grid">
        <view 
          v-for="(item, index) in integralExchange" 
          :key="index"
          class="integral-exchange-item"
          @tap="navigateToActivity(item.id)">
          <image :src="item.icon" class="integral-exchange-icon" />
          <text>{{ item.name }}</text>
        </view> 
      </view>
    </view>
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
      <swiper class="announcement-swiper" vertical="true" autoplay="true" circular>
        <swiper-item 
          v-for="(notice, idx) in notices" 
          :key="idx"
          @tap="navigateToNoticeDetail(notice.id)">
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
// import banner1 from '../../assets/images/dance1.png'
import bannerDance from '@/assets/images/dance3.png'
import bannerChorus from '@/assets/images/chorus1.png'
import bannerFashion from '@/assets/images/fashion2.png'

// 模拟热门活动数据
const hotActivities = ref([
  { id: 1001, image: bannerDance, title: '银发舞者舞&请向您的舞伴发出邀请' },
  { id: 1002, image: bannerChorus, title: '无龄秀场2025夏季赛制，南京中老年文化宫交响乐' },
  { id: 1003, image: bannerFashion, title: '无龄秀场 2025 届时装秀暨南京中老年文化旅游公益形象大使选拔赛' }
])

// 模拟活动分类数据
const categories = ref([
  // { id: 1, name: '独唱', icon: '@/assets/icons/icon_solo.png', path: '/assets/game.png' },
  // { id: 2, name: '合唱', icon: '@/assets/icons/icon_chorus.png', path: '/assets/sports.png' },
  // { id: 3, name: '舞蹈', icon: '@/assets/icons/icon_dance.png', path: '/assets/culture.png' },
  // { id: 4, name: '乐器', icon: '@/assets/icons/icon_fashion.png', path: '/assets/music.png' },
  // { id: 5, name: '时装秀', icon: '@/assets/icons/icon_instrument.png', path: '/assets/edu.png' }
])

const notices = ref([
  {id: 1001, type: '获奖', msg:'银发舞者舞报名截止日期 2025-08-15 23:59:59'},
  {id: 1002, type: '获奖', msg:'2025南京中老年文化宫交响乐'},
  {id: 1003, type: '获奖', msg:'无龄秀场，2025 届时装秀暨南京中老年文化旅游公益形象大使选拔赛'},
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

// 跳转到资讯详情页面
const navigateToNoticeDetail = (noticeId) => {
  Taro.navigateTo({
    url: `/pages/information/detail?id=${noticeId}`
  })
}

</script>

<style lang="scss">
.container {
  height: 100vh;
  // padding: 20px; // 移除默认内边距
  box-sizing: border-box; // 确保高度计算包含内边距
}

.swiper {
  height: 500rpx;
  border-radius: 16rpx;
  overflow: hidden;
}

swiper image {
  width: 100%;
  height: 100%; // 修改为自动高度以保持宽高比
}

.banner-title {
  position: absolute;
  bottom: 20rpx; // 居底部位置
  left: 20rpx;
  right: 20rpx;
  background-color: rgba(235, 232, 232, 0.5); // 添加半透明背景
  color: white;
  font-size: 32rpx;
  text-align: center;
  padding: 10rpx;
  border-radius: 8rpx;
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

.event-section {
  margin-top: 40rpx;
}

.section-title {
  font-size: 36rpx;
  font-weight: bold;
  margin-bottom: 20rpx;
  display: block;
}

.event-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20rpx;
}

.event-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20rpx;
  border-radius: 12rpx;
  background-color: #f5f7fa;
}

.event-date {
  font-size: 24rpx;
  color: #666;
  margin-top: 10rpx;
}
</style>