/**
* @description: 资讯活动详情
* @author: ltc 
**/
<template>
  <view class="detail-container">
    <!-- 资讯头部 -->
    <view class="header">
      <text class="title">{{ infoDetail.title }}</text>
      <view class="meta">
        <text class="time">{{ infoDetail.time }}</text>
        <text class="views">阅读 {{ infoDetail.views }}</text>
      </view>
    </view>
    
    <!-- 资讯内容 -->
    <scroll-view scroll-y class="content-container">
      <image v-if="infoDetail.image" :src="infoDetail.image" class="banner" mode="widthFix" />
      <rich-text :nodes="infoDetail.content" class="content"></rich-text>
    </scroll-view>
    
    <!-- 底部操作栏 -->
    <view class="footer">
      <button class="share-btn" open-type="share">
        <image src="https://img.dahepiao.com/uploads/allimg/250703/32638-pOZnB9tYwSsXN.png" class="icon" />
        <text>分享</text>
      </button>
      <!-- 评论功能暂时注释 -->
      <!-- 
      <button class="comment-btn" @tap="toggleComment">
        <image src="/assets/comment.png" class="icon" />
        <text>评论</text>
      </button>
      -->
      <!-- 点赞功能暂时注释 -->
      <!-- 
      <button class="like-btn" :class="{ liked: infoDetail.liked }" @tap="toggleLike">
        <image :src="infoDetail.liked ? '/assets/like_filled.png' : '/assets/like.png'" class="icon" />
        <text>{{ infoDetail.likes }}</text>
      </button>
      -->
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Taro, { useRouter, onPullDownRefresh } from '@tarojs/taro'

const router = useRouter()
const infoType = ref(router.params.type)
const infoId = ref(router.params.id)

// 资讯详情数据
const infoDetail = ref({
  id: 1,
  type: 'notice',
  title: '2023夏季电竞狂欢节即将开启',
  time: '2023-07-10 14:30',
  views: 1523,
  likes: 245,
  liked: false,
  image: 'https://img.dahepiao.com/uploads/allimg/250703/33034-DrVintUR3sdlr.png',
  content: `
    <p>亲爱的玩家们：</p>
    <p>我们很高兴地宣布，2023夏季电竞狂欢节将于8月15日正式拉开帷幕！本次狂欢节将汇集国内外顶尖战队，包含英雄联盟、王者荣耀、DOTA2等多个热门项目。</p>
    <p><strong>活动亮点：</strong></p>
    <ul>
      <li>国际顶尖战队对决</li>
      <li>百万奖金池</li>
      <li>明星选手见面会</li>
      <li>最新游戏设备体验区</li>
    </ul>
    <p><strong>活动时间：</strong>2023年8月15日 - 2023年8月20日</p>
    <p><strong>活动地点：</strong>上海国际电竞中心</p>
    <p>报名通道现已开启，欢迎广大玩家踊跃参与！</p>
    <img src="/assets/banner1.jpg" style="max-width:100%;margin:20rpx 0;" />
    <p>更多详情请持续关注我们的官方公告。</p>
  `
})

// 根据类型和ID获取资讯详情
const fetchInfoDetail = () => {
  console.log(`加载${infoType.value}详情:`, infoId.value)
  // 实际项目中应调用API
}

// 分享功能
const onShareAppMessage = () => {
    // Taro.downloadFile({
    //     url: 'https://res.wx.qq.com/wxdoc/dist/assets/img/demo.ef5c5bef.jpg',
    //     success: (res) => {
    //         Taro.showShareImageMenu({
    //         //   path: res.tempFilePath
    //         path: `/pages/information/detail?type=${infoType.value}&id=${infoId.value}`,
    //         })
    //     }
    // })
    return {
        title: infoDetail.value.title,
        path: `/pages/information/detail?type=${infoType.value}&id=${infoId.value}`,
        imageUrl: infoDetail.value.image || 'https://res.wx.qq.com/wxdoc/dist/assets/img/demo.ef5c5bef.jpg'
    }
}

// 点赞功能（暂时注释）
/*
const toggleLike = () => {
  infoDetail.value.liked = !infoDetail.value.liked
  infoDetail.value.likes += infoDetail.value.liked ? 1 : -1
  // 实际项目中应调用API
}
*/

// 评论功能（暂时注释）
/*
const toggleComment = () => {
  Taro.navigateTo({
    url: `/pages/information/comment?id=${infoId.value}`
  })
}
*/

onMounted(() => {
  fetchInfoDetail()
})
</script>

<style lang="scss">
.detail-container {
  padding: 20rpx;
  padding-bottom: 120rpx;
  background: #fff;
  min-height: 100vh;
}

.header {
  padding-bottom: 20rpx;
  border-bottom: 1rpx solid #eee;
  
  .title {
    font-size: 40rpx;
    font-weight: bold;
    display: block;
    margin-bottom: 15rpx;
  }
  
  .meta {
    display: flex;
    font-size: 26rpx;
    color: #999;
    
    .time {
      margin-right: 30rpx;
    }
  }
}

.content-container {
  height: calc(100vh - 200rpx);
  padding: 20rpx 0;
}

.banner {
  width: 100%;
  border-radius: 16rpx;
  margin-bottom: 30rpx;
}

.content {
  font-size: 30rpx;
  line-height: 1.8;
  
  p {
    margin-bottom: 20rpx;
  }
  
  img {
    max-width: 100%;
    border-radius: 16rpx;
    margin: 20rpx 0;
  }
}

.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  padding: 20rpx;
  box-shadow: 0 -2rpx 10rpx rgba(0,0,0,0.1);
  display: flex;
  justify-content: space-around;
  
  button {
    background: none;
    border: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 24rpx;
    color: #666;
    padding: 0;
    line-height: 1;
    
    &::after {
      border: none;
    }
  }
  
  .icon {
    width: 50rpx;
    height: 50rpx;
    margin-bottom: 10rpx;
  }
  
  .like-btn.liked {
    color: #e54d42;
  }
}
</style>