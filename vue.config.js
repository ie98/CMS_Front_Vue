module.exports = {
  devServer: {
    open: true,
    port: '9000',
    disableHostCheck: true
    // host: 'localhost',
    // proxyTable: {
    //   '/ct': {
    //     target: 'http://127.0.0.1:8088/',
    //     changeOrigin:true,
    //     pathRewrite:{
    //         '^/ct':'/'
    //     }
    //   }
    // }
  }
}
