module.exports = {
  devServer: {
    host: '0.0.0.0',
    port: '8082',
    open: true,
    proxy: {
      '/': {
        target: 'https://test.com/',
        ws: false,
        changOrigin: true
      }
    }
  },
  productionSourceMap: false,
  publicPath: '',
  lintOnSave: undefined,
  chainWebpack: config => {
    // 移除 prefetch 插件
    config.plugins.delete('prefetch')
    // 移除 preload 插件
    config.plugins.delete('preload')
  }
}
