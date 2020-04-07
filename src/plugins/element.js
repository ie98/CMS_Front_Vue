import Vue from 'vue'
import {
  Button,
  Form,
  FormItem,
  Input,
  Message,
  Container,
  Header,
  Aside,
  Main,
  Menu,
  Submenu,
  MenuItem,
  Men,
  MenuItemGroup,
  Row,
  Col,
  RadioGroup,
  RadioButton,
  Radio,
  Dialog,
  Select,
  Option,
  Alert,
  InputNumber,
  Table,
  TableColumn
} from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Row)
Vue.use(Col)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.use(Dialog)
Vue.use(Select)
Vue.use(Option)
Vue.use(Alert)
Vue.use(InputNumber)
Vue.use(Table)
Vue.use(TableColumn)
//将Message组件挂在到Vue的原型对象上，使得全局可用
Vue.prototype.$message = Message
