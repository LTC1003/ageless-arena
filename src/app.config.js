/**
 * @file app.config.js
 * @description 微信小程序配置文件
 * @author ltc
 * **/
export default {
  pages: [
    'pages/index/index',        // 首页[轮播、公告、分类]
    // 'pages/index/category',     // 分类[分类列表、分类详情]
    // 'pages/index/activity',     // 活动[活动列表、活动详情]
    // 'pages/index/search',       // 搜索[搜索结果、搜索历史]
    // 'pages/index/user',         // 用户[用户信息、用户收藏、用户历史记录]
    // 'pages/index/signup',       // 报名[报名信息填写、报名确认、报名成功]
    'pages/information/index',  // 资讯[最新赛事、最近活动、赛事排名]
    'pages/information/detail', // 资讯详情
    // 'pages/information/rank',   // 排行榜[积分排行、签到排行]
    // 'pages/information/activity',// 活动[活动列表、活动详情]
    // 'pages/information/rank',   // 排行榜[积分排行、签到排行]
    // 'pages/information/detail', // 资讯详情
    'pages/tournament/index',
    // 占位分割符
    'pages/mall/index',         // 商城[积分商城、积分兑换]
    'pages/mall/detail',        // 商城详情
    'pages/mall/cart',          // 购物车
    'pages/mall/list',          // 商城列表
    // 占位分割符
    'pages/myInfo/index',       // 个人中心[用户信息、积分、签到、收藏、历史记录]
    /**bar**/
    // 占位分割符
    'pages/signup/index',       // 报名[报名信息填写、报名确认、报名成功]
    // 'pages/category/index',
    // 占位分割符
    'pages/activity/list',      // 活动列表[活动分类、活动详情]
    'pages/activity/detail'     // 活动详情[活动报名、活动评价]
  ],
  "tabBar": {
    "list": [
      {
        "pagePath": "pages/index/index",
        "text": "首页",
        "iconPath": "assets/icons/bar/home.png",
        "selectedIconPath": "assets/icons/bar/home_active.png",
      },
      {
        "pagePath": "pages/information/index",
        "text": "资讯",
        "iconPath": "assets/icons/bar/news.png",
        "selectedIconPath": "assets/icons/bar/news_active.png",
      }, 
      {
        "pagePath": "pages/tournament/index",
        "text": "无龄秀场",
        "iconPath": "assets/icons/bar/logo_age.png",
        "selectedIconPath": "assets/icons/bar/logo_age1.png",
      }, 
      {
        "pagePath": "pages/mall/index",
        "text": "商店",
        "iconPath": "assets/icons/bar/mall.png",
        "selectedIconPath": "assets/icons/bar/mall_active.png",
      },
      {
        "pagePath": "pages/myInfo/index",
        "text": "个人中心",
        "iconPath": "assets/icons/bar/user.png",
        "selectedIconPath": "assets/icons/bar/user_active.png",
      },
    ]
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
    enablePullDownRefresh: true // 启用全局下拉刷新
  },
  // 为特定页面配置下拉刷新 
  // usingComponents: { // （页面配置项报错待修正）
  //   'pages/activity/detail': {
  //     enablePullDownRefresh: true
  //   },
  //   'pages/information/index': {
  //     enablePullDownRefresh: true
  //   }
  // }
}
