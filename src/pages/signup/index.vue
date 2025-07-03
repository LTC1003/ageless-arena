/**
* @description: 报名表单
* @author: ltc 
**/
<template>
  <view class="signup-container">
    <!-- 头部信息 -->
    <view class="header">
      <text class="title">活动报名</text>
      <text class="activity-name">{{ activityName }}</text>
    </view>
    
    <!-- 表单区域 -->
    <scroll-view scroll-y class="form-container">
      <form @submit="handleSubmit">
        <!-- 姓名 -->
        <view class="form-item">
          <text class="label">姓名</text>
          <input 
            class="input" 
            placeholder="请输入您的姓名"
            v-model="formData.name"
            required
          />
        </view>
        
        <!-- 手机号 -->
        <view class="form-item">
          <text class="label">手机号</text>
          <input 
            class="input" 
            placeholder="请输入您的手机号"
            v-model="formData.phone"
            type="number"
            required
          />
        </view>
        
        <!-- 邮箱 -->
        <view class="form-item">
          <text class="label">邮箱</text>
          <input 
            class="input" 
            placeholder="请输入您的邮箱"
            v-model="formData.email"
            type="email"
          />
        </view>
        
        <!-- 参赛类型 -->
        <view class="form-item">
          <text class="label">参赛类型</text>
          <picker 
            :range="competitionTypes" 
            @change="onCompetitionTypeChange"
          >
            <view class="picker">
              {{ formData.competitionType || '请选择参赛类型' }}
            </view>
          </picker>
        </view>
        
        <!-- 团队名称（如果选择团队） -->
        <view class="form-item" v-if="formData.competitionType === '团队'">
          <text class="label">团队名称</text>
          <input 
            class="input" 
            placeholder="请输入团队名称"
            v-model="formData.teamName"
          />
        </view>
        
        <!-- 备注 -->
        <view class="form-item">
          <text class="label">备注</text>
          <textarea 
            class="textarea" 
            placeholder="如有特殊需求请在此说明"
            v-model="formData.remark"
          />
        </view>
        
        <!-- 提交按钮 -->
        <button form-type="submit" class="submit-btn">提交报名</button>
      </form>
    </scroll-view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Taro, { useRouter } from '@tarojs/taro'

const router = useRouter()
const activityId = ref(router.params.activityId)

// 活动信息
const activityName = ref('')

// 表单数据
const formData = ref({
  name: '',
  phone: '',
  email: '',
  competitionType: '',
  teamName: '',
  remark: ''
})

// 参赛类型选项
const competitionTypes = ref(['个人', '团队'])

// 参赛类型选择
const onCompetitionTypeChange = (e) => {
  formData.value.competitionType = competitionTypes.value[e.detail.value]
}

// 表单提交
const handleSubmit = (e) => {
  if (!validateForm()) return
  console.log('提交表单数据：', formData.value, e)
  Taro.showLoading({ title: '提交中...' })
  
  // 模拟API请求
  setTimeout(() => {
    Taro.hideLoading()
    Taro.showToast({
      title: '报名成功',
      icon: 'success',
      duration: 2000
    })
    
    // 返回活动详情页
    setTimeout(() => {
      Taro.navigateBack()
    }, 2000)
  }, 1500)
}

// 表单验证
const validateForm = () => {
  if (!formData.value.name) {
    Taro.showToast({ title: '请输入姓名', icon: 'none' })
    return false
  }
  
  if (!formData.value.phone) {
    Taro.showToast({ title: '请输入手机号', icon: 'none' })
    return false
  }
  
  if (!/^1[3-9]\d{9}$/.test(formData.value.phone)) {
    Taro.showToast({ title: '手机号格式不正确', icon: 'none' })
    return false
  }
  
  if (formData.value.email && !/^\w+@[a-z0-9]+\.[a-z]{2,4}$/i.test(formData.value.email)) {
    Taro.showToast({ title: '邮箱格式不正确', icon: 'none' })
    return false
  }
  
  if (!formData.value.competitionType) {
    Taro.showToast({ title: '请选择参赛类型', icon: 'none' })
    return false
  }
  
  return true
}

// 获取活动信息
const fetchActivityInfo = () => {
  // 模拟API请求
  const mockActivities = {
    '1': '夏日文化艺术交流节',
    '2': '英雄联盟城市争霸赛',
    '3': '王者荣耀全国大赛'
  }
  
  activityName.value = mockActivities[activityId.value] || '未知活动'
}

onMounted(() => {
  fetchActivityInfo()
})
</script>

<style lang="scss">
.signup-container {
  padding: 20rpx;
  min-height: 100vh;
  background: #f5f5f5;
}

.header {
  background: #fff;
  padding: 30rpx;
  border-radius: 16rpx;
  margin-bottom: 20rpx;
  
  .title {
    font-size: 36rpx;
    font-weight: bold;
    display: block;
    margin-bottom: 10rpx;
  }
  
  .activity-name {
    font-size: 30rpx;
    color: #07c160;
  }
}

.form-container {
  height: calc(100vh - 180rpx);
  background: #fff;
  border-radius: 16rpx;
  padding: 20rpx;
}

.form-item {
  margin-bottom: 30rpx;
  padding-bottom: 20rpx;
  border-bottom: 1rpx solid #eee;
  
  &:last-child {
    border-bottom: none;
    margin-bottom: 20rpx;
  }
}

.label {
  display: block;
  font-size: 28rpx;
  margin-bottom: 15rpx;
  color: #333;
}

.input, .textarea, .picker {
  width: 100%;
  font-size: 28rpx;
  padding: 15rpx 0;
}

.textarea {
  height: 200rpx;
}

.picker {
  color: #999;
}

.submit-btn {
  background: #07c160;
  color: white;
  border-radius: 50rpx;
  margin-top: 30rpx;
}
</style>