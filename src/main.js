import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
//导入全局样式表
import './assets/css/global.css'
//导入字体图标
import  './assets/fonts/iconfont.css'
//导入axios
import axios from 'axios'

// import MintUI from 'mint-ui'
// import 'mint-ui/lib/style.css'

//将axios挂在到vue的原型对象的$http属性上
Vue.prototype.$http = axios
//配置请求根路径
axios.defaults.baseURL = 'http://127.0.0.1:8088/'
//axios设置请求拦截器
axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token') //设置响应头
  console.log(config)
  return config
}, err => {
  console.log(err)
})
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

// Vue.use(MintUI)