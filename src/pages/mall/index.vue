/**
* @description: 商城
* @author: ltc 
* 商城页面通常包含以下部分：
* 1. 搜索栏
* 2. 轮播图（广告/热门商品）
* 3. 商品分类导航
* 4. 商品列表（推荐、热销等）
* 需要添加的图片资源：
  1. `/assets/search.png` - 搜索图标
  2. `/assets/cart.png` - 购物车图标
  1.页面结构：
  顶部搜索栏：可搜索商品
  分类导航：水平滚动分类菜单
  轮播图：展示促销信息
  推荐商品：水平滚动展示
  热销商品：网格布局展示
  底部购物车入口

  2.商品展示：
  推荐商品：横向滚动，展示4个商品
  热销商品：网格布局，2列展示
  显示商品图片、名称、价格和销量

  3.交互功能：
  分类切换：点击分类可筛选商品
  商品点击：跳转到商品详情页
  轮播图点击：跳转到指定商品
  购物车入口：显示购物车数量，点击进入购物车

  4.导航功能：
  "更多"按钮：跳转到对应分类的商品列表页
  底部购物车：固定位置，方便随时访问
  
  *下一步建议：
  
  1. 创建商品详情页（`pages/mall/detail`）
  2. 创建购物车页面（`pages/mall/cart`）
  3. 创建商品列表页（`pages/mall/list`）
  4. 实现商品搜索功能
  5. 添加商品分类筛选
  6. 实现加入购物车功能
**/
  <template>
  <view class="mall-container">
    <!-- 搜索区域 -->
    <view class="search-section">
      <view class="search-box">
        <input
          class="search-input"
          placeholder="搜索商品"
          placeholder-class="placeholder"
          v-model="searchKeyword"
          @confirm="handleSearch"
        />
        <!-- <image src="/assets/search.png" class="search-icon"  @tap="handleSearch"/> -->
      </view>
    </view>

    <!-- 分类导航 -->
    <scroll-view scroll-x class="category-scroll">
      <view
        v-for="(category, index) in categories"
        :key="index"
        class="category-item"
        :class="{ active: activeCategory === category.id }"
        @tap="changeCategory(category.id)"
      >
        {{ category.name }}
      </view>
    </scroll-view>

    <!-- 轮播图 -->
    <swiper
      class="banner-swiper"
      autoplay
      circular
      indicator-dots
      indicator-color="rgba(0,0,0,0.3)"
      indicator-active-color="#07c160"
    >
      <swiper-item v-for="(banner, index) in banners" :key="index">
        <image
          :src="banner.image"
          class="banner-image"
          mode="aspectFill"
          @tap="viewBannerLink(banner.link)"
        />
      </swiper-item>
    </swiper>

    <!-- 商品区域 -->
    <view class="product-section">
      <!-- 推荐商品 -->
      <view class="section">
        <view class="section-header">
          <text class="section-title">推荐商品</text>
          <text class="more" @tap="viewMore('recommend')">更多</text>
        </view>

        <scroll-view scroll-x class="product-scroll">
          <view
            v-for="(product, index) in recommendedProducts"
            :key="index"
            class="product-card"
            @tap="viewProductDetail(product.id)"
          >
            <image
              :src="product.image"
              class="product-image"
              mode="aspectFill"
            />
            <text class="product-title">{{ product.title }}</text>
            <text class="product-price">¥{{ product.price }}</text>
          </view>
        </scroll-view>
      </view>

      <!-- 热销商品 -->
      <view class="section">
        <view class="section-header">
          <text class="section-title">热销商品</text>
          <text class="more" @tap="viewMore('hot')">更多</text>
        </view>

        <view class="product-grid">
          <view
            v-for="(product, index) in hotProducts"
            :key="index"
            class="product-item"
            @tap="viewProductDetail(product.id)"
          >
            <image :src="product.image" class="item-image" mode="aspectFill" />
            <text class="item-title">{{ product.title }}</text>
            <text class="item-price">¥{{ product.price }}</text>
            <text class="item-sales">已售{{ product.sales }}件</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 底部导航 -->
    <view class="footer">
      <view class="cart-icon" @tap="viewCart">
        <!-- <image src="/assets/cart.png" class="icon" /> -->
        <text class="count" v-if="cartCount > 0">{{ cartCount }}</text>
      </view>
      <text class="footer-text">购物车</text>
    </view>
  </view>
</template>
  
  <script setup>
import { onMounted, ref } from "vue";
import Taro from "@tarojs/taro";

// 搜索关键词
const searchKeyword = ref("");

// 当前激活的分类
const activeCategory = ref(0);

// 购物车数量
const cartCount = ref(0);

// 商品分类
const categories = ref([
  { id: 0, name: "全部" },
  { id: 1, name: "数码" },
  { id: 2, name: "食品" },
  { id: 3, name: "运动" },
  { id: 4, name: "家居" },
  { id: 5, name: "图书" },
]);

// 轮播图数据
const banners = ref([
  { id: 1, 
    image: "https://static.ecovacs.cn/upload/official_pc_index_img/2023/12/13/official_pc_index_img_17024536153956.jpg",
    link: "/pages/mall/detail?id=1001" },
  { id: 2, 
    image: "https://static.ecovacs.cn/upload/official_pc_index_img/2025/05/26/official_pc_index_img_17482282836985.jpg",
    link: "/pages/mall/detail?id=1002" },
  { id: 3,
    image: "https://static.ecovacs.cn/upload/official_pc_index_img/2023/11/16/official_pc_index_img_17001256052692.jpg", 
    link: "/pages/mall/detail?id=1003" },
    { id: 4,
    image: "https://pic4.zhimg.com/v2-5e16c80208f7b4b25970048fa656e1db_r.jpg", 
    link: "/pages/mall/detail?id=1004" },
]);

// 推荐商品
const recommendedProducts = ref([
  {
    id: 1001,
    title: "TicWatch Atlas Black",
    price: 199,
    image: "https://growth-cdn.ticwear.com/images/img_3327505310957639992.png",
  },
  { 
    id: 1002, 
    title: "TicWatch Pro 5 Sandstone",
    price: 1259, 
    image: "https://growth-cdn.ticwear.com/images/img_7792141925379936810.png" },
  { 
    id: 1003, 
    title: "ticwear", 
    price: 189, 
    image: "https://growth-cdn.ticwear.com/images/img_3785908001133227931.png" 
  },
  { 
    id: 1004, 
    title: "AUDIO ENTERTAINMENT", 
    price: 969, 
    image: "https://growth-cdn.ticwear.com/frontend/autoupload/ticbuy/image/treadmill-fit/powerful-5.png" 
  },
]);

// 热销商品
const hotProducts = ref([
  {
    id: 2001,
    title: "DEEBOT X5 PRO",
    price: 129,
    sales: 1200,
    image: "https://static.ecovacs.cn/upload/pms/2024/05/13/20240513094119684.png",
  },
  {
    id: 2002,
    title: "DEEBOT T30 PRO",
    price: 189,
    sales: 980,
    image: "https://static.ecovacs.cn/upload/pms/2024/02/27/20240227102239473.png",
  },
  {
    id: 2003,
    title: "DEEBOT X2 COMBO",
    price: 79,
    sales: 1560,
    image: "https://static.ecovacs.cn/upload/pms/2023/12/25/20231225111614427.png",
  },
  {
    id: 2004,
    title: "窗宝",
    price: 99,
    sales: 2100,
    image: "https://static.ecovacs.cn/upload/official_pc_index_img/2023/12/25/official_pc_index_img_17034879791908.png",
  },
]);

// 完整商品数据（用于分类筛选）
const allRecommendedProducts = ref([
  {
    id: 2001,
    title: "DEEBOT X5 PRO",
    price: 1290,
    category: 1,
    image: "https://static.ecovacs.cn/upload/pms/2024/05/13/20240513094119684.png",
  },
  {
    id: 2002,
    title: "DEEBOT T30 PRO",
    price: 989,
    category: 1,
    image: "https://static.ecovacs.cn/upload/pms/2024/02/27/20240227102239473.png",
  },
  {
    id: 2003,
    title: "DEEBOT X2 COMBO",
    price: 1560,
    category: 3,
    image: "https://static.ecovacs.cn/upload/pms/2023/12/25/20231225111614427.png",
  },
  {
    id: 2004,
    title: "窗宝",
    price: 2100,
    category: 5,
    image: "https://static.ecovacs.cn/upload/official_pc_index_img/2023/12/25/official_pc_index_img_17034879791908.png",
  },
])

const allHotProducts = ref([
  { 
    id: 2003,
    title: "DEEBOT X2 COMBO",
    price: 79,
    sales: 1560,
    category: 4,
    image: "https://static.ecovacs.cn/upload/pms/2023/12/25/20231225111614427.png",
  }, 
  {
    id: 2001,
    title: "DEEBOT X5 PRO",
    price: 129,
    sales: 1200,
    category: 3,
    image: "https://static.ecovacs.cn/upload/pms/2024/05/13/20240513094119684.png",
  },
  {
    id: 2002,
    title: "DEEBOT T30 PRO",
    price: 189,
    sales: 980,
    category: 1,
    image: "https://static.ecovacs.cn/upload/pms/2024/02/27/20240227102239473.png",
  },
  {
    id: 2003,
    title: "DEEBOT X2 COMBO",
    price: 79,
    sales: 1560,
    category: 4,
    image: "https://static.ecovacs.cn/upload/pms/2023/12/25/20231225111614427.png",
  },
  {
    id: 2004,
    title: "窗宝",
    price: 99,
    sales: 2100,
    category: 5,
    image: "https://static.ecovacs.cn/upload/official_pc_index_img/2023/12/25/official_pc_index_img_17034879791908.png",
  },
])
// 搜索处理
const handleSearch = () => {
  if (searchKeyword.value.trim()) {
    Taro.navigateTo({
    url: `/pages/mall/list?keyword=${encodeURIComponent(searchKeyword.value)}`,
    success: () => {
      // 模拟分类加载
      setTimeout(() => {
        // 根据分类ID加载商品
        if (categoryId === 0) {
          // 加载全部商品
          recommendedProducts.value = [...allRecommendedProducts]
          hotProducts.value = [...allHotProducts]
        } else {
          // 加载分类商品
          const categoryName = categories.value.find(c => c.id === categoryId)?.name || ''
          recommendedProducts.value = allRecommendedProducts.filter(p => 
            p.category === categoryId
          )
          hotProducts.value = allHotProducts.filter(p => 
            p.category === categoryId
          )
          
          // 如果没有商品，显示提示
          if (recommendedProducts.value.length === 0 && hotProducts.value.length === 0) {
            Taro.showToast({
              title: `${categoryName}分类暂无商品`,
              icon: 'none'
            })
          }
        }
        
        Taro.hideLoading()
      }, 800)
    }
  })
  } else {
    Taro.showToast({
      title: '请输入搜索关键词',
      icon: 'none'
    })
  }
}

// 切换分类（添加加载逻辑）
const changeCategory = (categoryId) => {
  activeCategory.value = categoryId
  // 实际项目中应加载对应分类的商品
  Taro.showLoading({ title: '加载中...' })
  recommendedProducts.value = allRecommendedProducts.filter(p => 
    p.category === categoryId
  )
}

// 查看商品详情
const viewProductDetail = (productId) => {
  // 记录用户行为（实际项目中应调用API）
  console.log(`用户查看商品: ${productId}`)
  Taro.navigateTo({
    url: `/pages/mall/detail?id=${productId}`,
  });
};

// 查看更多商品
const viewMore = (type) => {
  let title = '推荐商品'
  if (type === 'hot') title = '热销商品'

  Taro.navigateTo({
    // url: `/pages/mall/list?type=${type}`,
    url: `/pages/mall/list?type=${type}&title=${title}`
  });
};

// 点击轮播图
const viewBannerLink = (link) => {
  // 记录用户行为（实际项目中应调用API）
  console.log('用户点击轮播图', link)
  if (link) {
    Taro.navigateTo({
      url: link,
    });
  }
};

// 查看购物车
const viewCart = () => {
  // 检查用户是否登录（模拟）
  const isLoggedIn = true // 实际项目中应从状态管理获取
  if (!isLoggedIn) {
    // 跳转到登录页
  }
  // Taro.navigateTo({
  //   url: "/pages/mall/cart",
  // });
  if (isLoggedIn) {
    Taro.navigateTo({
      url: '/pages/mall/cart'
    })
  } else {
    Taro.showToast({
      title: '请先登录',
      icon: 'none',
      duration: 2000,
      complete: () => {
        Taro.navigateTo({
          url: '/pages/login/index'
        })
      }
    })
  }
};

onMounted(() => {
 
  // 获取用户信息
  // getUserInfo().then((res) => {
  //   console.log(res, 'getUserInfo')
  //   userInfo.value = res
  // })
})

</script>
  
  <style lang="scss">
.mall-container {
  padding: 20rpx;
  background: #f5f5f5;
  min-height: 100vh;
  padding-bottom: 100rpx;
}

.search-section {
  padding: 20rpx 0;
}

.search-box {
  position: relative;
  background: #fff;
  border-radius: 50rpx;
  padding: 16rpx 30rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
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

.banner-swiper {
  height: 300rpx;
  border-radius: 16rpx;
  overflow: hidden;
  margin-bottom: 20rpx;
}

.banner-image {
  width: 100%;
  height: 100%;
}

.product-section {
  margin-top: 20rpx;
}

.section {
  background: #fff;
  border-radius: 16rpx;
  padding: 20rpx;
  margin-bottom: 20rpx;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
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

.product-scroll {
  white-space: nowrap;
}

.product-card {
  display: inline-block;
  width: 200rpx;
  margin-right: 20rpx;

  &:last-child {
    margin-right: 0;
  }
}

.product-image {
  width: 200rpx;
  height: 200rpx;
  border-radius: 16rpx;
  margin-bottom: 10rpx;
}

.product-title {
  font-size: 26rpx;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.product-price {
  font-size: 28rpx;
  color: #e64340;
  font-weight: bold;
  display: block;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20rpx;
}

.product-item {
  background: #fafafa;
  border-radius: 16rpx;
  overflow: hidden;
  padding: 10rpx;
}

.item-image {
  width: 100%;
  height: 240rpx;
  border-radius: 8rpx;
}

.item-title {
  font-size: 26rpx;
  display: block;
  margin: 10rpx 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  height: 70rpx;
}

.item-price {
  font-size: 30rpx;
  color: #e64340;
  font-weight: bold;
  display: block;
}

.item-sales {
  font-size: 24rpx;
  color: #999;
  display: block;
}

.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  padding: 15rpx 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.1);
}

.cart-icon {
  position: relative;
  width: 60rpx;
  height: 60rpx;
}

.icon {
  width: 60rpx;
  height: 60rpx;
}

.count {
  position: absolute;
  top: -10rpx;
  right: -10rpx;
  background: #e64340;
  color: white;
  border-radius: 50%;
  width: 40rpx;
  height: 40rpx;
  text-align: center;
  line-height: 40rpx;
  font-size: 24rpx;
}

.footer-text {
  font-size: 24rpx;
  color: #666;
  margin-top: 5rpx;
}
</style>