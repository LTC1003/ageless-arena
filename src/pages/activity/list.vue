/**
* @description: 活动列表页面
* @author: ltc 
**/
<template>
  <view class="activity-list">
    <!-- 分类标题 -->
    <view class="category-header">
      <text class="title">{{ categoryName }}活动</text>
      <text class="count">共 {{ activities.length }} 场活动</text>
    </view>

    <!-- 活动列表 -->
    <scroll-view scroll-y class="list-container">
      <!-- 加载状态 -->
      <view v-if="loading" class="loading">
        <text>加载中...</text>
      </view>
      
      <!-- 空状态 -->
      <view v-else-if="activities.length === 0" class="empty">
        <image :src="'@/assets/empty.png'" class="empty-icon" />
        <text class="empty-text">暂无活动</text>
      </view>
      
      <!-- 活动列表 -->
      <view 
        v-else
        v-for="activity in activities" 
        :key="activity.id"
        class="activity-item"
        @tap="navigateToDetail(activity.id)">
        <image :src="activity.image" class="cover" mode="aspectFill" />
        <view class="info">
          <text class="name">{{ activity.name }}</text>
          <text class="time">{{ activity.time }}</text>
          <!-- 添加活动状态标签 -->
          <text class="status" :class="activity.status">{{ activity.statusText }}</text>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Taro, { useRouter } from '@tarojs/taro'

import iconSolo from '../../assets/icons/icon_solo.png'
import iconChorus from '../../assets/icons/icon_chorus.png'
import iconDance from '../../assets/icons/icon_dance.png'
import iconFashion from '../../assets/icons/icon_fashion.png'
// 获取路由参数（分类ID）
// const $instance = Taro.getCurrentInstance()
// const categoryId = ref($instance.router.params.categoryId)
const router = useRouter();
console.log(router, 'instance.router.params.categoryId')
const categoryId = ref(router.params.categoryId)

// 分类名称（根据分类ID设置，实际项目中应从API获取）
const categoryName = ref('')
// 活动列表数据
const activities = ref([])
// 加载状态
const loading = ref(true)

// 根据分类ID获取活动列表（模拟数据）
const fetchActivities = () => {
  // 模拟加载延迟
  setTimeout(() => {
    // 模拟根据分类ID获取活动
    const mockData = {
      1: [
        { 
          id: 1, 
          name: '英雄联盟城市争霸赛', 
          time: '2025-08-15 至 2025-08-25', 
          image: iconSolo,
          status: 'active',
          statusText: '火热报名中'
        },
        { 
          id: 2, 
          name: '王者荣耀全国大赛', 
          time: '2025-12-03 至 2025-12-10', 
          image: iconChorus,
          status: 'upcoming',
          statusText: '即将开始'
        }
      ],
      2: [
        { 
          id: 3, 
          name: '篮球3V3挑战赛', 
          time: '2025-11-13 至 2025-12-08', 
          image: iconDance,
          status: 'active',
          statusText: '报名中'
        },
        { 
          id: 4, 
          name: '羽毛球公开赛', 
          time: '2023-08-22 至 2023-08-28', 
          image: iconFashion,
          status: 'ended',
          statusText: '已结束'
        }
      ],
      // ...其他分类数据
    }

    // 设置分类名称（根据分类ID映射）
    const categoryMap = {
      1: '电竞赛事',
      2: '体育竞技',
      3: '文化展览',
      4: '音乐演出',
      5: '教育培训'
    }

    categoryName.value = categoryMap[categoryId.value] || '活动'
    activities.value = mockData[categoryId.value] || []
    loading.value = false
  }, 300)
}

// 跳转到活动详情
const navigateToDetail = (activityId) => {
  Taro.navigateTo({
    url: `/pages/activity/detail?id=${activityId}`
  })
}

onMounted(() => {
  fetchActivities()
  loading.value = true
})
</script>

<style lang="scss">
.activity-list {
  padding: 20rpx;
  height: 100vh;
  background: #f5f5f5;
}

.category-header {
  padding: 20rpx;
  background: #fff;
  border-radius: 16rpx;
  margin-bottom: 20rpx;
  
  .title {
    font-size: 36rpx;
    font-weight: bold;
    display: block;
    margin-bottom: 10rpx;
  }
  
  .count {
    font-size: 26rpx;
    color: #666;
  }
}

.list-container {
  height: calc(100vh - 180rpx);
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200rpx;
  font-size: 28rpx;
  color: #999;
}

.empty {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 400rpx;
  
  .empty-icon {
    width: 200rpx;
    height: 200rpx;
    margin-bottom: 20rpx;
  }
  
  .empty-text {
    font-size: 28rpx;
    color: #999;
  }
}

.activity-item {
  display: flex;
  margin-bottom: 20rpx;
  background: #fff;
  border-radius: 16rpx;
  overflow: hidden;
  box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.05);

  .cover {
    width: 200rpx;
    height: 200rpx;
  }

  .info {
    flex: 1;
    padding: 20rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .name {
      font-size: 32rpx;
      font-weight: bold;
      margin-bottom: 10rpx;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }

    .time {
      font-size: 26rpx;
      color: #666;
      margin-bottom: 10rpx;
    }
    
    .status {
      align-self: flex-start;
      font-size: 24rpx;
      padding: 4rpx 12rpx;
      border-radius: 8rpx;
      
      &.active {
        background: rgba(7, 193, 96, 0.1);
        color: #07c160;
      }
      
      &.upcoming {
        background: rgba(255, 193, 7, 0.1);
        color: #ffc107;
      }
      
      &.ended {
        background: rgba(108, 117, 125, 0.1);
        color: #6c757d;
      }
    }
  }
}
</style>