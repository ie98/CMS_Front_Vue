import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../components/Login.vue";
import Home from "../components/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Login
  },
  {
    path: "/login",
    component: Login
  },
  {
    path: "/home",
    component: Home
  }
];

const router = new VueRouter({
  routes
});

router.beforeEach((to,from,next) =>{
  //to是要去哪个页面
  //from是从哪个页面过来
  //next是一个函数表示放行
  //next 有两种用法 
  //1. next() 表示直接放行 2.next('/login') 强制跳转到login
  if(to.path === '/login') return next();
  const bool = window.sessionStorage.getItem('token');
  if(!bool) return next('/login');
  next();

})

export default router;
