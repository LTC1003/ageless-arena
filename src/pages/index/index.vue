<template>
  <view class="index">
    <!-- <Counter /> -->
    <!-- 活动轮播图 -->
    <swiper class="banner" indicator-dots autoplay circular>
      <swiper-item v-for="(item, index) in banners" :key="index">
        <image :src="item.image" mode="aspectFill" />
        <text class="banner-title">{{ item.title }}</text>
      </swiper-item>
    </swiper>
    <!-- 赛事分类入口 -->
    <!-- <view class="category-grid">
      <view 
        v-for="(category, i) in categories" 
        :key="i"
        class="category-item"
        @click="handleCategory(category)"
      >
        <image :src="category.icon" class="category-icon" />
        <text>{{ category.name }}</text>
      </view>
    </view> -->
    <!-- 最新公告 -->
    <view class="announcement">
      <text class="announcement-label">最新公告：</text>
      <swiper class="announcement-swiper" vertical autoplay circular>
        <swiper-item v-for="(notice, idx) in notices" :key="idx">
          <text class="notice-text">{{ notice }}</text>
        </swiper-item>
      </swiper>
    </view>

    <!-- 报名按钮 -->
    <view class="signup-btn-container">
      <button class="signup-btn" @click="handleSignUp">立即报名</button>
    </view>
  </view>
</template>

<script>
import './index.scss'
// import Counter from '../../components/Counter.vue'

export default {
  name: 'Index',
  // components: {
  //   Counter
  // },
  data() {
    return {
      // 轮播图数据
      banners: [
        { image: 'https://img95.699pic.com/photo/50089/8326.jpg_wh860.jpg', title: '2023艺术节火热进行中' },
        { image: 'https://www.evoote.com/wp-content/uploads/2023/06/20230610090246-64843c36c9ffc.jpg', title: '往届精彩回顾' },
        { image: 'https://img-baofun.zhhainiao.com/pcwallpaper_ugc/static/dc73ecd9085f9fb6eeb988a0dcb7f63d.jpg?x-oss-process=image%2fresize%2cm_lfit%2cw_1920%2ch_1080', title: '往届精彩回顾' },
        { image: 'https://img-baofun.zhhainiao.com/pcwallpaper_ugc_mobile/static/77b2110349b12444a35ef146e7064f15.jpg?x-oss-process=image%2fresize%2cm_lfit%2cw_3840%2ch_2160' },
      ],
      // 赛事分类数据
      // categories: [
      //   { name: '独唱', icon: '/static/icons/icon_solo.png' },
      //   { name: '合唱', icon: '/static/icons/icon_chorus.png' },
      //   { name: '舞蹈', icon: '/static/icons/icon_dance.png' },
      //   { name: '器乐', icon: '/static/icons/icon_instrument.png' },
      //   { name: '时装秀', icon: '/static/icons/icon_fashion.png' }
      // ],
      // 公告数据
      notices: [
        '报名截止日期延至10月30日',
        '器乐比赛新增电子琴组别',
        '决赛场地变更为市艺术中心'
      ]
    }
  },
  methods: {
    handleCategory(category) {
      uni.navigateTo({
        url: `/pages/category/index?type=${category.name}`
      })
    },
    handleSignUp() {
      uni.navigateTo({
        url: '/pages/signup/index'
      })
    }
  }
}
</script>
