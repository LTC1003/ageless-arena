/**
 *  @file src/store/cart.js 购物车     使用 Taro + Vue3 + Pinia + Sass 技术栈
 *  使用 Pinia 定义 store，包含以下状态和方法：
 *  状态 state: cartItems (购物车中的商品列表，每个商品包括id, name, price, quantity, image等)
 *  getters: totalPrice (计算总价)
 *  方法 methods: addItem(item) 添加商品 removeItem(id) 移除商品 updateQuantity(id, quantity) 更新数量
 *  
 *  getters: cartItems (获取购物车中的商品列表) 
 * 
 * ***/ 
import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [], // 购物车商品列表
  }),
  getters: {
    totalCount: (state) => state.items.reduce((sum, item) => sum + item.quantity, 0),
    totalPrice: (state) => state.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
  },
  actions: {
    addItem(product) {
      const existing = this.items.find(item => item.id === product.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        this.items.push({ ...product, quantity: 1 });
      }
    },
    removeItem(id) {
      this.items = this.items.filter(item => item.id !== id);
    },
    updateQuantity(id, quantity) {
      const item = this.items.find(item => item.id === id);
      if (item) item.quantity = quantity;
    },
    clearCart() {
      this.items = [];
    }
  },
});