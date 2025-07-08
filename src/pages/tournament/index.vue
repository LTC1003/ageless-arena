<template>
    <!-- 赛事活动 -->
    <swiper class="banner-section" :autoplay="false" circular>
        <swiper-item v-for="event in events" :key="event.id" class="event-item" @click="navigateToEventDetail(event.id)">
            <view class="event-container">
                <image :src="event.bgImage" class="event-bg" mode="aspectFill" />
                <view class="event-info">
                    <text class="event-name">{{ event.name }}</text>
                    <text class="event-time">{{ event.startTime }} - {{ event.endTime }}</text>
                    <text class="event-status">{{ event.status }}</text>
                </view>
            </view>
        </swiper-item>
    </swiper>
    <Icon size='20' type='search' />
    <!-- 赛事奖品 -->
    <view class="prize-section">
        <view class="prize-item first">
            <text class="prize-rank">第一名</text>
            <text class="prize-desc">奖品1</text>
        </view>
        <view class="prize-item second">
            <text class="prize-rank">第二名</text>
            <text class="prize-desc">奖品2</text>
        </view>
        <view class="prize-item third">
            <text class="prize-rank">第三名</text>
            <text class="prize-desc">奖品3</text>
        </view>
    </view>

    <!-- 赛事规则 -->
    <view class="roles-section">
        <view v-for="(rule, idx) in eventsRegulations.participate" :key="idx" class="rule-item">
            <view class="rule-meta">
                <image :src="rule.icon" class="rule-icon" mode="aspectFill" />
                <text class="rule-title">{{ rule.title }}</text>
                <text class="rule-content">{{ rule.content }}</text>
            </view>
        </view>
    </view>
</template>

<script setup>
// ... existing imports and data definitions ...
import { ref } from 'vue'
import Taro, { onBackgroundAudioPlay } from '@tarojs/taro'
import bannerDance from '@/assets/images/dance3.png'
import bannerChorus from '@/assets/images/chorus1.png'
import bannerFashion from '@/assets/images/fashion2.png'
import bannerSolo from '@/assets/icons/icon_solo.png'

// 模拟举办赛事活动
const events = ref([
    {id: 1001, name: 'Dance', bgImage: bannerDance, startTime: '2023-05-01 10:00:00', endTime: '2023-05-01 12:00:00', status: '进行中'},
    {id: 1002, name: 'Chorus', bgImage: bannerChorus, startTime: '2023-05-01 10:00:00', endTime: '2023-05-01 12:00:00', status: '进行中'}
])

// 赛事奖品数据
const prizes = ref([
    {rank: '第一名', desc: '奖品1'},
    {rank: '第二名', desc: '奖品2'},
    {rank: '第三名', desc: '奖品3'}
])

// 开始的赛事规则
const eventsRegulations = ref({
    participate: [
        {id: 3001, icon: bannerSolo, title: '竞赛规程', content: '详细规则'}, 
        {id: 3002, icon: bannerSolo, title: '报名须知', content: '注意事项'},
        {id: 3003, icon: bannerSolo, title: '参赛声明', content: '责任声明'},
    ],
})

// 跳转到赛事详情
const navigateToEventDetail = (eventId) => {
  Taro.navigateTo({
    url: `/pages/tournament/detail?id=${eventId}`
  })
}

</script>

<style lang="scss">
/* 轮播区域样式 */
.banner-section {
  height: 400rpx;
  margin: 20rpx;
  
  .event-item {
    height: 100%;
    
    .event-container {
      position: relative;
      height: 100%;
      border-radius: 16rpx;
      overflow: hidden;
      
      .event-bg {
        position: absolute;
        width: 100%;
        height: 100%;
        /* 确保图片填充容器并居中裁剪 */
        object-fit: cover;
        object-position: center;
      }
      
      .event-info {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 20rpx;
        background: linear-gradient(transparent, rgba(0,0,0,0.7));
        color: white;
        display: flex;
        flex-direction: column;
        
        .event-name {
          font-size: 32rpx;
          font-weight: bold;
        }
        
        .event-time {
          font-size: 24rpx;
          margin-top: 8rpx;
        }
        
        .event-status {
          position: absolute;
          top: 20rpx;
          right: 20rpx;
          background-color: #07C160;
          color: white;
          padding: 4rpx 12rpx;
          border-radius: 20rpx;
          font-size: 24rpx;
        }
      }
    }
  }
}

/* 奖品区域样式 */
.prize-section {
  display: flex;
  justify-content: space-around;
  margin: 40rpx 20rpx;
  
  .prize-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20rpx;
    border-radius: 16rpx;
    color: white;
    margin: 0 10rpx;
    
    &.first {
      background-color: #FFD700;
    }
    
    &.second {
      background-color: #C0C0C0;
    }
    
    &.third {
      background-color: #CD7F32;
    }
    
    .prize-rank {
      font-size: 28rpx;
      font-weight: bold;
    }
    
    .prize-desc {
      font-size: 24rpx;
      margin-top: 8rpx;
    }
  }
}

/* 规则区域样式 - 改为栅格布局 */
.roles-section {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 三列等宽栅格 */
  gap: 20rpx; /* 统一设置行列间距 */
  margin: 20rpx;

  .rule-item {
    background-color: #f5f5f5;
    border-radius: 16rpx;
    padding: 20rpx;
    
    .rule-meta {
      display: flex;
      flex-direction: column; /* 内容改为纵向排列 */
      align-items: center; /* 内容居中 */
      
      .rule-icon {
        width: 60rpx; /* 增大图标尺寸 */
        height: 60rpx;
        margin-right: 0; /* 移除右侧间距 */
        margin-bottom: 10rpx; /* 添加底部间距 */
        object-fit: cover;
        object-position: center;
      }
      
      .rule-title {
        font-size: 28rpx;
        font-weight: bold;
        margin-right: 0; /* 移除右侧间距 */
        margin-bottom: 8rpx; /* 添加底部间距 */
        text-align: center; /* 文字居中 */
      }
      
      .rule-content {
        font-size: 26rpx;
        color: #666;
        text-align: center; /* 文字居中 */
      }
    }
  }
}
</style>