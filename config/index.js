/**
 * @file /config/index.js
 * @description 项目的#taro-cli+vite配置文件
 * @author ltc
 * **/
import { defineConfig } from '@tarojs/cli'
const path = require('path')

import devConfig from './dev'
import prodConfig from './prod'

// https://taro-docs.jd.com/docs/next/config#defineconfig-辅助函数
export default defineConfig(async (merge, { command, mode }) => {
  console.log('command:', command, mode)
  const baseConfig = {
    projectName: 'ageless-arena',     // 项目名称
    date: '2025-7-2',                 // 项目创建日期
    designWidth: 750,                 // 设计稿宽度     
    deviceRatio: {                    // 屏幕适配比例 
      640: 2.34 / 2,
      750: 1,
      375: 2,
      828: 1.81 / 2
    },
    sourceRoot: 'src',                // 源码目录
    outputRoot: 'dist',               // 构建输出目录
    plugins: [],                      // 插件     
    defineConstants: {                // 全局变量
    },
    copy: {                           // 拷贝文件 
      patterns: [                     // 拷贝文件列表
      ],
      options: {                      // 拷贝文件配置
      }
    },
    framework: 'vue3',                // 框架
    compiler: 'vite',                 // 编译器
    // 别名配置
    alias: {
      '@': path.resolve(__dirname, '..', 'src'),
      '@assets': path.resolve(__dirname, '..', 'src/assets'),
      // '@stores': path.resolve(__dirname, '..', 'src/request'),
      '@components': path.resolve(__dirname, '..', 'src/components')
    },
    mini: {                             // 构建时针对微信小程序的配置                        
      postcss: {                      // postcss 配置
        pxtransform: {                // 微信小程序样式转换配置
          enable: true,               // 是否开启样式转换    
          config: {                   // 样式转换配置

          }
        },
        cssModules: {                 // css 模块化配置
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {                   
            namingPattern: 'module',  // 转换模式，取值为 global/module
            generateScopedName: '[name]__[local]___[hash:base64:5]'
          }
        }
      }
    },
    h5: {                             // 构建时针对 H5 的配置
      publicPath: '/',
      staticDirectory: 'static',

      miniCssExtractPluginOption: {
        ignoreOrder: true,
        filename: 'css/[name].[hash].css',
        chunkFilename: 'css/[name].[chunkhash].css'
      },
      postcss: {
        autoprefixer: {
          enable: true,
          config: {}
        },
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {
            namingPattern: 'module', // 转换模式，取值为 global/module
            generateScopedName: '[name]__[local]___[hash:base64:5]'
          }
        }
      }
    },
    rn: {                               // 构建时针对 React Native 的配置          
      appName: 'taroDemo',
      postcss: {
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        }
      }
    }
  }
  if (process.env.NODE_ENV === 'development') {
    // 本地开发构建配置（不混淆压缩）
    return merge({}, baseConfig, devConfig)
  }
  // 生产构建配置（默认开启压缩混淆等）
  return merge({}, baseConfig, prodConfig)
})
