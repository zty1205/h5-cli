# h5-cli
基本vue-cli3的项目模板生成插件, 用于生成开发H5模板
author: <zty1160051490@qbb6.com>

## project
### generator
- dependencies.json： 项目需要的生产环境依赖
- devDependencies.json： 项目需要的开发环境依赖
- scripts.json：项目脚本
- index.js：渲染模板，添加依赖

## template
- config：eslint等配置文件
- default： 默认模板
- env： env环境变量配置
- route：路由文件
- store：vuex文件

## prompts.js
终端交互命令

## command
vue create --preset zty1205/h5-cli my-project

-  option 是否需要添加 vue-router
-  option 是否需要添加 store 状态树