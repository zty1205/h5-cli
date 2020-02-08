module.exports = {
  //一旦配置了root，ESlint停止在父级目录中查找配置文件
  root: true,
  parserOptions: {
    // babel-eslint写在这里，防止与eslint-plugin-vue冲突
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  //代码运行的环境
  env: {
    browser: true,
  },
  //集成推荐的规则
  'extends': [
    "plugin:vue/base",
    'eslint:recommended'
  ],
  //支持第三方插件的规则，插件以eslint-plugin-作为前缀，配置时该前缀可省略
  //检查vue文件需要eslint-plugin-vue插件
  plugins: [
    'vue'
  ],
  //启用额外的规则或者覆盖默认的规则
  //规则级别分别：为"off"(0)关闭、"warn"(1)警告、"error"(2)错误--error触发时，程序退出
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // 'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "space-before-function-paren": 0,
    "semi": 0,
    "quotes": 0,
    "no-console": 0,
    "no-unused-vars": 0,
    "no-empty": 0,
    "no-undef": 0,
    "no-mixed-spaces-and-tabs": 0,
  },
  // 关闭vue文件中的indent校验
  'overrides': [
    {
      'files': ['*.vue'],
      'rules': {
        'indent': 'off'
      }
    }
  ]
}
