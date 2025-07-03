/**
* @description: 资讯页面
* @author: ltc 
**/
<template>
  <view class="information-container">
    <!-- 搜索区域 -->
    <view class="search-section">
      <view class="search-box">
        <input 
          class="search-input" 
          placeholder="搜索资讯内容" 
          placeholder-class="placeholder"
          v-model="searchKeyword"
        />
        <image src="https://img.dahepiao.com/uploads/allimg/250411/50971-89yIa7Unqgx6n.jpg" class="search-icon" />
      </view>
    </view>
    
    <!-- 资讯分类 -->
    <scroll-view scroll-x class="category-scroll">
      <view 
        v-for="(category, index) in categories" 
        :key="index"
        class="category-item"
        :class="{ active: activeCategory === category.type }"
        @tap="changeCategory(category.type)">
        {{ category.name }}
      </view>
    </scroll-view>
    
    <!-- 资讯列表 -->
    <scroll-view scroll-y class="list-container">
      <!-- 最新公告 -->
      <view v-if="activeCategory === 'announcement'" class="information-section">
        <view class="section-header">
          <text class="section-title">最新公告</text>
          <text class="more">更多</text>
        </view>
        
        <view 
          v-for="(notice, index) in filteredNotices" 
          :key="index"
          class="information-item"
          @tap="viewNoticeDetail(notice.id)">
          <view class="info-content">
            <text class="info-title">{{ notice.title }}</text>
            <text class="info-desc">{{ notice.content }}</text>
            <view class="info-meta">
              <text class="meta-item">{{ notice.time }}</text>
              <text class="meta-item">阅读 {{ notice.views }}</text>
            </view>
          </view>
          <image :src="notice.image" class="info-image" mode="aspectFill" />
        </view>
      </view>
      
      <!-- 获奖信息 -->
      <view v-if="activeCategory === 'awards'" class="information-section">
        <view class="section-header">
          <text class="section-title">赛事获奖</text>
          <text class="more">更多</text>
        </view>
        
        <view 
          v-for="(winner, index) in filteredWinners" 
          :key="index"
          class="winner-item"
          @tap="viewWinnerDetail(winner.id)">
          <image :src="winner.avatar" class="avatar" mode="aspectFill" />
          <view class="winner-info">
            <text class="winner-name">{{ winner.name }}</text>
            <text class="winner-event">在 {{ winner.event }} 中获得 {{ winner.rank }}</text>
            <text class="winner-prize">奖金: {{ winner.prize }}</text>
          </view>
          <image :src="winner.badge" class="badge" mode="aspectFit" />
        </view>
      </view>
      
      <!-- 赛事规则 -->
      <view v-if="activeCategory === 'rules'" class="information-section">
        <view class="section-header">
          <text class="section-title">赛事规则</text>
        </view>
        
        <view 
          v-for="(rule, index) in filteredRules" 
          :key="index"
          class="rule-item"
          @tap="viewRuleDetail(rule.id)">
          <text class="rule-title">{{ rule.title }}</text>
          <text class="rule-desc">{{ rule.description }}</text>
          <view class="rule-meta">
            <text class="meta-item">更新日期: {{ rule.updateDate }}</text>
            <text class="meta-item">适用赛事: {{ rule.applicable }}</text>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import Taro, { onPullDownRefresh } from '@tarojs/taro'

// 当前激活的分类
const activeCategory = ref('announcement')
// 搜索关键词
const searchKeyword = ref('')

// 资讯分类
const categories = ref([
  { name: '最新公告', type: 'announcement' },
  { name: '赛事获奖', type: 'awards' },
  { name: '赛事规则', type: 'rules' }
])

// 模拟公告数据
const notices = ref([
  {
    id: 1,
    title: '2023夏季电竞狂欢节即将开启',
    content: '本次狂欢节将包含英雄联盟、王者荣耀等多个热门项目，欢迎广大玩家报名参与...',
    time: '2023-07-10',
    views: 1523,
    image: 'https://img.dahepiao.com/uploads/allimg/250411/50971-89yIa7Unqgx6n.jpg',
    type: 'announcement'
  },
  {
    id: 2,
    title: '赛事规则更新通知',
    content: '为提升比赛公平性，我们对部分赛事规则进行了调整，请参赛选手务必阅读...',
    time: '2023-07-05',
    views: 987,
    image: 'https://img.dahepiao.com/uploads/allimg/250613/01885-s399642WFge55.png',
    type: 'announcement'
  },
  {
    id: 3,
    title: '新用户注册福利活动',
    content: '即日起至8月31日，新注册用户可获得价值100元礼包，包含赛事门票折扣券...',
    time: '2023-07-01',
    views: 2105,
    image: 'https://img.dahepiao.com/uploads/allimg/250508/92448-9338gFlezpgm4.jpg',
    type: 'announcement'
  }
])

// 模拟获奖者数据
const winners = ref([
  {
    id: 1,
    name: '张三',
    avatar: 'https://img.dahepiao.com/uploads/allimg/250411/50971-89yIa7Unqgx6n.jpg',
    event: '英雄联盟城市争霸赛',
    rank: '冠军',
    prize: '¥20,000',
    badge: 'https://img.dahepiao.com/uploads/allimg/250411/50971-89yIa7Unqgx6n.jpg',
    type: 'awards'
  },
  {
    id: 2,
    name: '李四',
    avatar: 'https://img.dahepiao.com/uploads/allimg/250613/01885-s399642WFge55.png',
    event: '王者荣耀全国大赛',
    rank: '亚军',
    prize: '¥10,000',
    badge: 'https://img.dahepiao.com/uploads/allimg/250613/01885-s399642WFge55.png',
    type: 'awards'
  },
  {
    id: 3,
    name: '王五',
    avatar: 'https://img.dahepiao.com/uploads/allimg/250508/92448-9338gFlezpgm4.jpg',
    event: 'DOTA2国际邀请赛',
    rank: '季军',
    prize: '¥5,000',
    badge: 'https://img.dahepiao.com/uploads/allimg/250508/92448-9338gFlezpgm4.jpg',
    type: 'awards'
  }
])

// 模拟赛事规则数据
const rules = ref([
  {
    id: 1,
    title: '英雄联盟赛事规则',
    description: '详细规定了英雄联盟比赛的参赛资格、赛制安排、违规处理等内容...',
    updateDate: '2023-06-20',
    applicable: '所有英雄联盟相关赛事',
    type: 'rules'
  },
  {
    id: 2,
    title: '王者荣耀赛事规则',
    description: '包含王者荣耀比赛的英雄选择规则、禁用机制、胜负判定标准等...',
    updateDate: '2023-06-15',
    applicable: '王者荣耀官方赛事',
    type: 'rules'
  },
  {
    id: 3,
    title: '通用行为规范',
    description: '所有参赛选手必须遵守的行为规范，包括禁止使用外挂、尊重对手等...',
    updateDate: '2023-06-10',
    applicable: '所有赛事',
    type: 'rules'
  }
])

// 切换分类
const changeCategory = (type) => {
  activeCategory.value = type
  searchKeyword.value = ''
}

// 查看公告详情
const viewNoticeDetail = (id) => {
  Taro.navigateTo({
    url: `/pages/information/detail?type=notice&id=${id}`,
    success: function (res) { 
      console.log(res, '/pages/information/detail?type=notice success')
    },
    fail: function (err) { 
      console.log(id, '/pages/information/detail?type=notice fail')
      console.error('跳转失败:', err)
    },
  })
  
}

// 查看获奖者详情
const viewWinnerDetail = (id) => {
  Taro.navigateTo({
    url: `/pages/information/detail?type=winner&id=${id}`
  })
}

// 查看规则详情
const viewRuleDetail = (id) => {
  Taro.navigateTo({
    url: `/pages/information/detail?type=rule&id=${id}`
  })
}

// 根据搜索关键词过滤公告
const filteredNotices = computed(() => {
  if (!searchKeyword.value) return notices.value
  return notices.value.filter(notice => 
    notice.title.includes(searchKeyword.value) || 
    notice.content.includes(searchKeyword.value)
  )
})

// 根据搜索关键词过滤获奖者
const filteredWinners = computed(() => {
  if (!searchKeyword.value) return winners.value
  return winners.value.filter(winner => 
    winner.name.includes(searchKeyword.value) || 
    winner.event.includes(searchKeyword.value)
  )
})

// 根据搜索关键词过滤规则
const filteredRules = computed(() => {
  if (!searchKeyword.value) return rules.value
  return rules.value.filter(rule => 
    rule.title.includes(searchKeyword.value) || 
    rule.description.includes(searchKeyword.value)
  )
})

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

onMounted(() => {
  // 页面初始化逻辑
})
</script>

<style lang="scss">
.information-container {
  padding: 20rpx;
  background-color: #f5f5f5;
  min-height: 100vh;
}

.search-section {
  padding: 20rpx 0;
}

.search-box {
  position: relative;
  background: #fff;
  border-radius: 50rpx;
  padding: 16rpx 30rpx;
  box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.05);
}

.search-input {
  height: 60rpx;
  font-size: 28rpx;
  padding-left: 60rpx;
}

.placeholder {
  color: #999;
}

.search-icon {
  position: absolute;
  left: 30rpx;
  top: 50%;
  transform: translateY(-50%);
  width: 40rpx;
  height: 40rpx;
}

.category-scroll {
  white-space: nowrap;
  padding: 20rpx 0;
}

.category-item {
  display: inline-block;
  padding: 12rpx 30rpx;
  margin-right: 20rpx;
  background: #fff;
  border-radius: 50rpx;
  font-size: 28rpx;
  color: #666;
  
  &.active {
    background: #07c160;
    color: white;
    font-weight: bold;
  }
}

.list-container {
  height: calc(100vh - 240rpx);
}

.information-section {
  background: #fff;
  border-radius: 16rpx;
  padding: 20rpx;
  margin-bottom: 20rpx;
  box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.05);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20rpx;
  border-bottom: 1rpx solid #eee;
  margin-bottom: 20rpx;
}

.section-title {
  font-size: 32rpx;
  font-weight: bold;
}

.more {
  font-size: 26rpx;
  color: #07c160;
}

.information-item {
  display: flex;
  padding: 20rpx 0;
  border-bottom: 1rpx solid #f5f5f5;
  
  &:last-child {
    border-bottom: none;
  }
}

.info-content {
  flex: 1;
  padding-right: 20rpx;
}

.info-title {
  font-size: 30rpx;
  font-weight: bold;
  margin-bottom: 10rpx;
  display: block;
}

.info-desc {
  font-size: 26rpx;
  color: #666;
  display: block;
  margin-bottom: 15rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.info-meta {
  display: flex;
  font-size: 24rpx;
  color: #999;
}

.meta-item {
  margin-right: 20rpx;
}

.info-image {
  width: 200rpx;
  height: 150rpx;
  border-radius: 8rpx;
}

.winner-item {
  display: flex;
  align-items: center;
  padding: 20rpx 0;
  border-bottom: 1rpx solid #f5f5f5;
  
  &:last-child {
    border-bottom: none;
  }
}

.avatar {
  width: 100rpx;
  height: 100rpx;
  border-radius: 50%;
  margin-right: 20rpx;
}

.winner-info {
  flex: 1;
}

.winner-name {
  font-size: 30rpx;
  font-weight: bold;
  display: block;
}

.winner-event {
  font-size: 26rpx;
  color: #666;
  display: block;
  margin: 5rpx 0;
}

.winner-prize {
  font-size: 26rpx;
  color: #e6a23c;
  font-weight: bold;
}

.badge {
  width: 60rpx;
  height: 60rpx;
}

.rule-item {
  padding: 20rpx 0;
  border-bottom: 1rpx solid #f5f5f5;
  
  &:last-child {
    border-bottom: none;
  }
}

.rule-title {
  font-size: 30rpx;
  font-weight: bold;
  display: block;
  margin-bottom: 10rpx;
}

.rule-desc {
  font-size: 26rpx;
  color: #666;
  display: block;
  margin-bottom: 15rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.rule-meta {
  display: flex;
  font-size: 24rpx;
  color: #999;
}
</style>