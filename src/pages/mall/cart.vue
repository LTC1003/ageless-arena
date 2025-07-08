/**
 *  @file /pages/mall/cart.vue 购物车页面
 *  结构：：
 *  1. 顶部导航栏
 *  2. 商品列表（展示购物车中的商品，包括图片、名称、价格、数量选择器、删除按钮）
 *  3. 底部结算栏（总价、结算按钮）
 *  使用 store 中的 cartItems 和 totalPrice
 * 
 * ***/ 
 <template>
    <view class="cart-container">
      <!-- 头部 -->
      <view class="cart-header">
        <text class="title">购物车</text>
        <text v-if="cartStore.totalCount > 0" class="clear-btn" @click="clearCart">清空</text>
      </view>
  
      <!-- 商品列表 -->
      <scroll-view v-if="cartStore.items.length > 0" class="cart-items" scroll-y>
        <view v-for="item in cartStore.items" :key="item.id" class="cart-item">
          <!-- <image :src="item.image" class="item-image" /> -->
          <view class="item-info">
            <text class="item-name">{{ item.name }}</text>
            <text class="item-price">¥{{ item.price.toFixed(2) }}</text>
          </view>
          <view class="item-quantity">
            <text class="quantity-btn" @click="updateQuantity(item.id, item.quantity - 1)">-</text>
            <text class="quantity">{{ item.quantity }}</text>
            <text class="quantity-btn" @click="updateQuantity(item.id, item.quantity + 1)">+</text>
          </view>
          <text class="delete-btn" @click="removeItem(item.id)">×</text>
        </view>
      </scroll-view>
  
      <!-- 空购物车提示 -->
      <view v-else class="empty-cart">
        <!-- <image src="/assets/icons/empty-cart.png" class="empty-icon" /> -->
        <text class="empty-text">购物车空空如也</text>
        <button class="shop-btn" @click="goToMall">去逛逛</button>
      </view>
  
      <!-- 底部结算栏 -->
      <view v-if="cartStore.items.length > 0" class="cart-footer">
        <view class="total-info">
          <text>共 {{ cartStore.totalCount }} 件</text>
          <text class="total-price">合计: ¥{{ cartStore.totalPrice.toFixed(2) }}</text>
        </view>
        <button class="checkout-btn" @click="checkout">结算</button>
      </view>
    </view>
  </template>
  
  <script setup>
  import { useCartStore } from '@/stores/cart';
  import Taro from '@tarojs/taro';
  
  const cartStore = useCartStore();
  
  const removeItem = (id) => cartStore.removeItem(id);
  const updateQuantity = (id, quantity) => {
    if (quantity > 0) cartStore.updateQuantity(id, quantity);
  };
  const clearCart = () => cartStore.clearCart();
  const checkout = () => Taro.navigateTo({ url: '/pages/mall/checkout' });
  const goToMall = () => Taro.switchTab({ url: '/pages/mall/index' });
  </script>
  
  <style lang="scss">
  .cart-container {
    padding: 20rpx;
    min-height: 100vh;
    background-color: #f5f5f5;
  
    .cart-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20rpx 0;
      border-bottom: 1rpx solid #eee;
      
      .title {
        font-size: 36rpx;
        font-weight: bold;
      }
      
      .clear-btn {
        color: #999;
        font-size: 28rpx;
      }
    }
  
    .cart-items {
      max-height: 70vh;
      
      .cart-item {
        display: flex;
        align-items: center;
        padding: 20rpx;
        margin-bottom: 20rpx;
        background-color: #fff;
        border-radius: 10rpx;
        
        .item-image {
          width: 160rpx;
          height: 160rpx;
          border-radius: 8rpx;
          margin-right: 20rpx;
        }
        
        .item-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          
          .item-name {
            font-size: 28rpx;
            margin-bottom: 10rpx;
            // @include ellipsis(2);
          }
          
          .item-price {
            color: #e64340;
            font-size: 32rpx;
            font-weight: bold;
          }
        }
        
        .item-quantity {
          display: flex;
          align-items: center;
          margin: 0 20rpx;
          
          .quantity-btn {
            width: 50rpx;
            height: 50rpx;
            text-align: center;
            line-height: 50rpx;
            border: 1rpx solid #ddd;
            font-size: 36rpx;
          }
          
          .quantity {
            width: 70rpx;
            text-align: center;
            font-size: 32rpx;
          }
        }
        
        .delete-btn {
          font-size: 40rpx;
          color: #999;
        }
      }
    }
  
    .empty-cart {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding-top: 100rpx;
      
      .empty-icon {
        width: 200rpx;
        height: 200rpx;
        margin-bottom: 30rpx;
      }
      
      .empty-text {
        font-size: 32rpx;
        color: #999;
        margin-bottom: 40rpx;
      }
      
      .shop-btn {
        width: 240rpx;
        height: 80rpx;
        line-height: 80rpx;
        background-color: #07c160;
        color: #fff;
        border-radius: 40rpx;
        font-size: 32rpx;
      }
    }
  
    .cart-footer {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20rpx 30rpx;
      background-color: #fff;
      border-top: 1rpx solid #eee;
      
      .total-info {
        display: flex;
        flex-direction: column;
        
        .total-price {
          color: #e64340;
          font-size: 36rpx;
          font-weight: bold;
        }
      }
      
      .checkout-btn {
        width: 240rpx;
        height: 80rpx;
        line-height: 80rpx;
        background-color: #e64340;
        color: #fff;
        border-radius: 40rpx;
        font-size: 32rpx;
      }
    }
  }
  </style>