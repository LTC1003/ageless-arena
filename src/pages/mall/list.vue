/**
* @description: 商城列表页面
* @author: ltc 
*
*   /assets/search.png - 搜索图标
    /assets/sort-up.png - 升序排序图标
    /assets/sort-down.png - 降序排序图标
    /assets/back-top.png - 返回顶部图标
    功能说明：
    1.页面结构：
    顶部搜索栏：支持搜索商品
    筛选栏：综合、销量、价格、新品四种排序方式
    商品列表：列表布局展示商品
    返回顶部按钮：滚动超过一定距离后显示

    2.商品展示：
    商品图片、标题、标签（热卖、新品等）
    当前价格和原价（折扣商品显示）
    销量和好评率
    加载更多提示

    3.交互功能：
    搜索功能：支持回车搜索和图标点击搜索
    排序功能：点击筛选栏切换排序方式
    商品点击：跳转到商品详情页
    上拉加载：滚动到底部自动加载更多
    返回顶部：点击返回页面顶部
    
    4.数据加载：
    分页加载：每次加载10条商品
    模拟数据：根据排序规则生成模拟数据
    加载状态：显示加载中提示

    使用场景：
    1.从搜索进入：
    商城首页搜索关键词后跳转到列表页
    URL: /pages/mall/list?keyword=耳机&title=搜索结果
    2.从分类进入：
    点击分类导航或"更多"按钮
    URL: /pages/mall/list?type=hot&title=热销商品
    3.直接访问：
    默认展示所有商品
    URL: /pages/mall/list
*
** /
<template>
  <view class="list-container">
    <!-- 搜索栏 -->
    <view class="search-section">
      <view class="search-box">
        <input 
          class="search-input" 
          placeholder="搜索商品" 
          placeholder-class="placeholder"
          v-model="searchKeyword"
          @confirm="handleSearch"
        />
        <!-- <image src="/assets/search.png" class="search-icon" @click="handleSearch" /> -->
      </view>
    </view>
    
    <!-- 筛选栏 -->
    <view class="filter-section">
      <view 
        v-for="filter in filters" 
        :key="filter.value"
        class="filter-item"
        :class="{ active: sortType === filter.value }"
        @click="changeSort(filter.value)"
      >
        {{ filter.label }}
        <!-- <image 
          v-if="filter.sortable" 
          :src="sortOrder === 'asc' ? '/assets/sort-up.png' : '/assets/sort-down.png'" 
          class="sort-icon"
        /> -->
      </view>
    </view>
    
    <!-- 商品列表 -->
    <scroll-view 
      scroll-y 
      class="product-list"
      @scrolltolower="loadMore"
      enable-back-to-top
    >
      <view 
        v-for="(product, index) in products" 
        :key="index"
        class="product-item"
        @click="viewProductDetail(product.id)"
      >
        <!-- <image :src="product.image" class="item-image" mode="aspectFill" /> -->
        <view class="item-info">
          <text class="item-title">{{ product.title }}</text>
          <view class="item-tags">
            <text v-if="product.tag" class="tag">{{ product.tag }}</text>
          </view>
          <view class="item-price-section">
            <text class="item-price">¥{{ product.price }}</text>
            <text v-if="product.originalPrice" class="item-original-price">¥{{ product.originalPrice }}</text>
          </view>
          <view class="item-meta">
            <text class="item-sales">已售{{ product.sales }}件</text>
            <text class="item-rating">好评率{{ product.rating }}%</text>
          </view>
        </view>
      </view>
      
      <!-- 加载更多 -->
      <view class="load-more">
        <text v-if="loading">加载中...</text>
        <text v-else-if="hasMore">上拉加载更多</text>
        <text v-else>没有更多商品了</text>
      </view>
    </scroll-view>
    
    <!-- 返回顶部 -->
    <view class="back-top" @click="scrollToTop" v-if="showBackTop">
      <!-- <image src="/assets/back-top.png" class="back-top-icon" /> -->
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import Taro, { useRouter } from '@tarojs/taro'

const router = useRouter()
const keyword = ref(router.params.keyword || '')
const type = ref(router.params.type || '')
const title = ref(router.params.title || '商品列表')

// 搜索关键词
const searchKeyword = ref(keyword.value)

// 排序类型
const sortType = ref('default')
const sortOrder = ref('desc') // asc: 升序, desc: 降序

// 分页数据
const page = ref(1)
const pageSize = ref(10)
const hasMore = ref(true)
const loading = ref(false)

// 商品列表
const products = ref([])
const showBackTop = ref(false)

// 筛选选项
const filters = ref([
  { label: '综合', value: 'default', sortable: false },
  { label: '销量', value: 'sales', sortable: true },
  { label: '价格', value: 'price', sortable: true },
  { label: '新品', value: 'new', sortable: false }
])

// 设置页面标题
onMounted(() => {
  Taro.setNavigationBarTitle({ title: title.value })
  fetchProducts()
})

// 监听排序变化
watch([sortType, sortOrder], () => {
  page.value = 1
  hasMore.value = true
  products.value = []
  fetchProducts()
})

// 获取商品列表
const fetchProducts = () => {
  if (loading.value || !hasMore.value) return
  loading.value = true
  
  // 模拟API请求
  setTimeout(() => {
    const mockProducts = generateMockProducts()
    products.value = [...products.value, ...mockProducts]
    
    // 更新分页状态
    page.value += 1
    hasMore.value = products.value.length < 50
    loading.value = false
  }, 800)
}

// 生成模拟商品数据
const generateMockProducts = () => {
  const mockData = []
  const startIndex = (page.value - 1) * pageSize.value
  
  for (let i = 0; i < pageSize.value; i++) {
    const id = startIndex + i + 1
    const price = Math.floor(Math.random() * 500) + 50
    const originalPrice = Math.random() > 0.5 ? price + Math.floor(Math.random() * 200) : null
    
    mockData.push({
      id,
      title: `商品${id} ${keyword.value ? `(${keyword.value})` : ''}`,
      price,
      originalPrice,
      sales: Math.floor(Math.random() * 1000),
      rating: Math.floor(Math.random() * 20) + 80, // 80-99%
    //   image: `https://picsum.photos/200/200?random=${id}`,
      tag: Math.random() > 0.7 ? '热卖' : Math.random() > 0.5 ? '新品' : ''
    })
  }
  
  // 根据排序规则排序
  return sortProducts(mockData)
}

// 根据排序规则排序商品
const sortProducts = (data) => {
  if (sortType.value === 'default') return data
  
  return [...data].sort((a, b) => {
    if (sortType.value === 'sales') {
      return sortOrder.value === 'asc' ? a.sales - b.sales : b.sales - a.sales
    } else if (sortType.value === 'price') {
      return sortOrder.value === 'asc' ? a.price - b.price : b.price - a.price
    } else if (sortType.value === 'new') {
      return sortOrder.value === 'asc' ? a.id - b.id : b.id - a.id
    }
    return 0
  })
}

// 处理搜索
const handleSearch = () => {
  if (searchKeyword.value.trim()) {
    Taro.redirectTo({
      url: `/pages/mall/list?keyword=${encodeURIComponent(searchKeyword.value)}&title=搜索结果`
    })
  } else {
    Taro.showToast({
      title: '请输入搜索关键词',
      icon: 'none'
    })
  }
}

// 改变排序方式
const changeSort = (type) => {
  if (type === sortType.value && filters.value.find(f => f.value === type)?.sortable) {
    // 如果是可排序的，切换排序方向
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    // 切换排序类型
    sortType.value = type
    sortOrder.value = 'desc' // 默认降序
  }
}

// 加载更多
const loadMore = () => {
  if (hasMore.value && !loading.value) {
    fetchProducts()
  }
}

// 查看商品详情
const viewProductDetail = (productId) => {
  Taro.navigateTo({
    url: `/pages/mall/detail?id=${productId}`
  })
}

// 滚动处理
const handleScroll = (e) => {
  showBackTop.value = e.detail.scrollTop > 500
}

// 返回顶部
const scrollToTop = () => {
  Taro.pageScrollTo({
    scrollTop: 0,
    duration: 300
  })
}
</script>

<style lang="scss">
.list-container {
  padding: 20rpx;
  background: #f5f5f5;
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

.filter-section {
  display: flex;
  justify-content: space-around;
  background: #fff;
  padding: 20rpx 0;
  margin-bottom: 20rpx;
  border-radius: 16rpx;
}

.filter-item {
  display: flex;
  align-items: center;
  font-size: 28rpx;
  color: #666;
  padding: 10rpx 20rpx;
  border-radius: 30rpx;
  
  &.active {
    background: #f0f9eb;
    color: #07c160;
    font-weight: bold;
  }
}

.sort-icon {
  width: 24rpx;
  height: 24rpx;
  margin-left: 8rpx;
}

.product-list {
  height: calc(100vh - 200rpx);
}

.product-item {
  display: flex;
  background: #fff;
  border-radius: 16rpx;
  margin-bottom: 20rpx;
  padding: 20rpx;
}

.item-image {
  width: 200rpx;
  height: 200rpx;
  border-radius: 8rpx;
  margin-right: 20rpx;
}

.item-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.item-title {
  font-size: 28rpx;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.item-tags {
  margin-top: 10rpx;
}

.tag {
  display: inline-block;
  font-size: 22rpx;
  color: #e64340;
  background: #ffebe9;
  padding: 4rpx 12rpx;
  border-radius: 4rpx;
  margin-right: 10rpx;
}

.item-price-section {
  display: flex;
  align-items: baseline;
  margin-top: 10rpx;
}

.item-price {
  font-size: 32rpx;
  color: #e64340;
  font-weight: bold;
  margin-right: 10rpx;
}

.item-original-price {
  font-size: 24rpx;
  color: #999;
  text-decoration: line-through;
}

.item-meta {
  display: flex;
  justify-content: space-between;
  margin-top: 10rpx;
  font-size: 24rpx;
  color: #999;
}

.load-more {
  text-align: center;
  padding: 30rpx 0;
  font-size: 26rpx;
  color: #999;
}

.back-top {
  position: fixed;
  right: 30rpx;
  bottom: 120rpx;
  width: 80rpx;
  height: 80rpx;
  background: rgba(0,0,0,0.4);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.back-top-icon {
  width: 40rpx;
  height: 40rpx;
}
</style>