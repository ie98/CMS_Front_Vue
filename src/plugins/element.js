import Vue from 'vue'
import { Button,Form,FormItem,Input,Message } from 'element-ui'

Vue.use(Button)

Vue.use(Form)

Vue.use(FormItem)

Vue.use(Input)
//将Message组件挂在到Vue的原型对象上，使得全局可用
Vue.prototype.$message = Message
