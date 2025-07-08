<template>
    <view class="product-detail">
      <!-- 商品图片轮播 -->
      <swiper class="product-swiper" indicator-dots autoplay circular>
        <swiper-item v-for="(image, index) in product.images" :key="index">
          <image :src="image" class="swiper-image" mode="aspectFit" />
        </swiper-item>
      </swiper>
  
      <!-- 商品基本信息 -->
      <view class="product-info">
        <view class="price-section">
          <text class="current-price">¥{{ product.price.toFixed(2) }}</text>
          <text v-if="product.originalPrice" class="original-price">¥{{ product.originalPrice.toFixed(2) }}</text>
        </view>
        <text class="product-name">{{ product.name }}</text>
        <text class="sales">月销{{ product.sales }}件</text>
        <view class="tags">
          <text v-for="(tag, index) in product.tags" :key="index" class="tag">{{ tag }}</text>
        </view>
      </view>
  
      <!-- 商品规格选择 -->
      <view class="spec-section">
        <text class="section-title">规格</text>
        <view class="spec-options">
          <text 
            v-for="(spec, index) in product.specs" 
            :key="index" 
            class="spec-option"
            :class="{ selected: selectedSpec === spec }"
            @click="selectSpec(spec)"
          >
            {{ spec }}
          </text>
        </view>
      </view>
  
      <!-- 商品详情描述 -->
      <view class="detail-section">
        <text class="section-title">详情</text>
        <rich-text :nodes="product.description" class="product-description"></rich-text>
      </view>
  
      <!-- 底部操作栏 -->
      <view class="action-bar">
        <view class="action-icons">
          <button class="icon-btn" open-type="contact">
            <!-- <image src="/assets/icons/service.png" class="icon" /> -->
            <text>客服</text>
          </button>
          <button class="icon-btn" @click="toggleFavorite">
            <!-- <image :src="isFavorite ? '/assets/icons/favorite-active.png' : '/assets/icons/favorite.png'" class="icon" /> -->
            <text>收藏</text>
          </button>
          <button class="icon-btn" @click="goToCart">
            <!-- <image src="/assets/icons/cart.png" class="icon" /> -->
            <text>购物车</text>
          </button>
        </view>
        <view class="action-buttons">
          <button class="add-to-cart" @click="addToCart">加入购物车</button>
          <button class="buy-now" @click="buyNow">立即购买</button>
        </view>
      </view>
    </view>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useCartStore } from '@/stores/cart';
  import Taro from '@tarojs/taro';
  
  // 模拟商品数据（实际项目中应从API获取）
  const product = ref({
    id: 1,
    name: '高品质运动护腕',
    price: 59.9,
    originalPrice: 79.9,
    sales: 128,
    tags: ['正品保障', '7天退换', '包邮'],
    images: [
      '/assets/products/wristband1.jpg',
      '/assets/products/wristband2.jpg',
      '/assets/products/wristband3.jpg'
    ],
    specs: ['黑色', '白色', '灰色', '蓝色'],
    description: `
      <p><strong>产品特点：</strong></p>
      <p>1. 采用高弹性材质，提供强力支撑</p>
      <p>2. 透气网眼设计，保持手腕干爽</p>
      <p>3. 魔术贴设计，可自由调节松紧</p>
      <p>4. 适合篮球、网球、健身等多种运动</p>
      <p><br></p>
      <p><strong>产品参数：</strong></p>
      <p>材质：尼龙+涤纶+乳胶</p>
      <p>尺寸：均码（适合大多数成年人）</p>
      <p>颜色：黑色/白色/灰色/蓝色</p>
      <p><br></p>
      <p><img src="/assets/products/wristband-detail.jpg" style="width:100%;"></p>
    `
  });
  
  const selectedSpec = ref(product.value.specs[0]);
  const isFavorite = ref(false);
  const cartStore = useCartStore();
  
  onMounted(() => {
    // 实际项目中应通过商品ID获取详情数据
    // fetchProductDetail();
  });
  
  // 选择规格
  const selectSpec = (spec) => {
    selectedSpec.value = spec;
  };
  
  // 切换收藏状态
  const toggleFavorite = () => {
    isFavorite.value = !isFavorite.value;
    Taro.showToast({
      title: isFavorite.value ? '已收藏' : '已取消收藏',
      icon: 'none'
    });
  };
  
  // 加入购物车
  const addToCart = () => {
    cartStore.addItem({
      id: product.value.id,
      name: product.value.name,
      price: product.value.price,
      image: product.value.images[0],
      spec: selectedSpec.value
    });
    
    Taro.showToast({
      title: '已加入购物车',
      icon: 'success'
    });
  };
  
  // 立即购买
  const buyNow = () => {
    addToCart();
    Taro.switchTab({ url: '/pages/mall/cart' });
  };
  
  // 跳转到购物车
  const goToCart = () => {
    Taro.switchTab({ url: '/pages/mall/cart' });
  };
  </script>
  
  <style lang="scss">
  .product-detail {
    padding-bottom: 120rpx; // 为底部操作栏留出空间
    background-color: #f5f5f5;
    
    .product-swiper {
      height: 750rpx;
      background-color: #fff;
      
      .swiper-image {
        width: 100%;
        height: 100%;
      }
    }
    
    .product-info {
      padding: 30rpx;
      background-color: #fff;
      margin-bottom: 20rpx;
      
      .price-section {
        display: flex;
        align-items: baseline;
        margin-bottom: 20rpx;
        
        .current-price {
          font-size: 48rpx;
          color: #e64340;
          font-weight: bold;
          margin-right: 20rpx;
        }
        
        .original-price {
          font-size: 28rpx;
          color: #999;
          text-decoration: line-through;
        }
      }
      
      .product-name {
        font-size: 36rpx;
        font-weight: bold;
        margin-bottom: 15rpx;
        display: block;
      }
      
      .sales {
        font-size: 26rpx;
        color: #999;
        margin-bottom: 20rpx;
        display: block;
      }
      
      .tags {
        display: flex;
        
        .tag {
          font-size: 24rpx;
          color: #e64340;
          border: 1rpx solid #e64340;
          border-radius: 6rpx;
          padding: 4rpx 10rpx;
          margin-right: 10rpx;
        }
      }
    }
    
    .spec-section, .detail-section {
      padding: 30rpx;
      background-color: #fff;
      margin-bottom: 20rpx;
      
      .section-title {
        font-size: 32rpx;
        font-weight: bold;
        margin-bottom: 20rpx;
        display: block;
      }
      
      .spec-options {
        display: flex;
        flex-wrap: wrap;
        
        .spec-option {
          padding: 12rpx 24rpx;
          border: 1rpx solid #ddd;
          border-radius: 8rpx;
          margin-right: 20rpx;
          margin-bottom: 15rpx;
          font-size: 28rpx;
          
          &.selected {
            border-color: #e64340;
            color: #e64340;
            background-color: rgba(230, 67, 64, 0.1);
          }
        }
      }
      
      .product-description {
        font-size: 28rpx;
        line-height: 1.6;
      }
    }
    
    .action-bar {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      display: flex;
      background-color: #fff;
      padding: 15rpx 20rpx;
      box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.1);
      
      .action-icons {
        display: flex;
        flex: 1;
        
        .icon-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 0;
          background: none;
          border: none;
          font-size: 24rpx;
          color: #666;
          margin-right: 20rpx;
          
          &::after {
            border: none;
          }
          
          .icon {
            width: 50rpx;
            height: 50rpx;
            margin-bottom: 5rpx;
          }
        }
      }
      
      .action-buttons {
        display: flex;
        
        .add-to-cart, .buy-now {
          height: 80rpx;
          line-height: 80rpx;
          border-radius: 40rpx;
          font-size: 32rpx;
          padding: 0 40rpx;
          margin-left: 20rpx;
          
          &::after {
            border: none;
          }
        }
        
        .add-to-cart {
          background-color: #ffb400;
          color: #fff;
        }
        
        .buy-now {
          background-color: #e64340;
          color: #fff;
        }
      }
    }
  }
  </style>