<template>
  <div class="all">
    <el-container class="home-container">
      <el-header>
        <div>
          <img src="" alt="" />
          <span>便捷食堂(手机端建议横屏显示，双击缩小) </span>
        </div>
        <el-button type="info" @click="loginOut">退出</el-button>
      </el-header>
      <el-container>
        <el-aside width="139px">
          <!-- 整个菜单 -->
          <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
            <el-radio-button :label="false">展开</el-radio-button>
            <el-radio-button :label="true">收起</el-radio-button>
          </el-radio-group> -->
          <el-menu
            class="el-menu-vertical-demo"
            
           
          >
            <!-- 一级菜单 -->
            <el-submenu index="1">
              <!-- 设置图标及名称 -->
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>抢位置</span>
              </template>
              <el-menu-item-group>
                <template slot="title">楼层</template>
                <!-- 二级菜单 -->
                <el-menu-item index="1-1" @click="toSitOne">
                  <template slot="title">
                    <i class="el-icon-circle-plus"></i>
                    <span>A区(左)</span>
                  </template>
                </el-menu-item>
                <el-menu-item index="1-2" @click="toSitTwo">
                  <template slot="title">
                    <i class="el-icon-circle-plus"></i>
                    <span>B区(右)</span>
                  </template></el-menu-item
                >
                <el-menu-item index="1-3" @click="showDialogForm"
                  >系统推荐</el-menu-item
                >
              </el-menu-item-group>
            </el-submenu>

            <!-- <el-menu-item index="2">
              <i class="el-icon-menu"></i>
              <span slot="title">随机选餐</span>
            </el-menu-item> -->

            <!-- 一级菜单 -->
            <el-submenu index="2">
              <!-- 设置图标及名称 -->
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>美食</span>
              </template>
              <el-menu-item-group>
                <!-- 二级菜单 -->
                <el-menu-item index="2-1" @click="toSelectFood">
                  <template slot="title">
                    <i class="el-icon-circle-plus"></i>
                    <span>选餐</span>
                  </template>
                </el-menu-item>
                <el-menu-item index="2-2" @click="showRecommendFood">
                  <i class="el-icon-circle-check"></i>

                  <span>系统推荐</span></el-menu-item
                >
                <el-menu-item index="2-3"
                @click="toCart">
                  <template slot="title">
                    <i class="el-icon-circle-plus"></i>

                    <span>购物车</span>
                  </template>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>

            <el-menu-item index="3" disabled>
              <i class="el-icon-document"></i>
              <span slot="title">导航三</span>
            </el-menu-item>
            <el-menu-item index="4">
              <i class="el-icon-setting"></i>
              <span slot="title">视频模块</span>
            </el-menu-item>
          </el-menu></el-aside
        >
        <el-container>
          <el-main>
            <div v-if="show.sit">
              <div>
                <el-row :gutter="20">
                  <div v-for="TableItem in tableArry" :key="TableItem.id">
                    <el-col :span="3">
                      <el-row>
                        <div v-for="item in TableItem.chairs" :key="item.id">
                          <el-col :span="8">
                            <el-button
                              v-if="
                                item.empty == true &&
                                  item.recommendSit == false &&
                                  item.absempty == true
                              "
                              type="primary"
                              style="margin: 10px 10px; padding: 3px;"
                            >
                              {{ TableItem.id + '-' + item.chairnumber }}
                            </el-button>
                            <el-button
                              v-if="
                                item.empty == true &&
                                  item.recommendSit == true &&
                                  item.absempty == true
                              "
                              type="success"
                              style="margin: 10px 10px; padding: 3px;"
                            >
                              {{ TableItem.id + '-' + item.chairnumber }}
                            </el-button>
                            <el-button
                              v-if="
                                item.empty == false && item.absempty == true
                              "
                              type="info"
                              style="margin: 10px 10px; padding: 3px;"
                              disabled="disabled"
                            >
                              {{ TableItem.id + '-' + item.chairnumber }}
                            </el-button>
                            <el-button
                              v-if="item.absempty == false"
                              type="danger"
                              style="margin: 10px 10px; padding: 3px;"
                              disabled="disabled"
                            >
                              {{ TableItem.id + '-' + item.chairnumber }}
                            </el-button>
                          </el-col>
                        </div>
                      </el-row>
                      <br />
                      <br />
                    </el-col>
                  </div>
                </el-row>
              </div>
              <el-button
                type="success confirm"
                @click="selectConfirm"
                v-if="showConfirm"
                >确定</el-button
              >
            </div>
            <div v-if="show.food">
              <div>
                <div v-for="items in allFood" :key="items.id">
                  <el-row>
                    <div v-for="item in items" :key="item.id">
                      <el-col :span="4">
                        <!-- <router-link :to="'/product/' + info.id" class="product-main"  > -->
                        <div class="product-main">
                          <h4>{{ item.shopname }}</h4>
                          <img
                            :src="
                              require('D:/vueProject/vue_proj_01/src/assets/imgs/' +
                                item.img)
                            "
                            style="height: 100px; width: 80%;"
                          />
                          <h4>{{ item.foodname }}</h4>

                          <div>
                            <el-input-number
                              v-model="item.num"
                              :min="0"
                              :max="10"
                              size="small"
                              label="描述文字"
                            ></el-input-number>
                          </div>
                          <div class="product-cost">¥ {{ item.price }}</div>
                          <el-button
                            type="primary"
                            size="mini"
                            @click="addcart(item)"
                            >加入购物车</el-button
                          >
                          <!-- <div class="product-add-cart" @click.prevent="handleCart">加入购物车</div> -->
                          <!-- </router-link> -->
                        </div>
                      </el-col>
                    </div>
                  </el-row>
                </div>
              </div>
            </div>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
    <el-dialog title="自动选座位" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item
          label="人数"
          :label-width="formLabelWidth"
          prop="peopleNumber"
        >
          <el-input-number
            v-model="form.peopleNumber"
            @change="peopleNumberBlur"
            :min="1"
            :max="10"
          ></el-input-number>
          <!-- <el-input v-model="form.peopleNumber" @blur="peopleNumberBlur" autocomplete="off"></el-input> -->
        </el-form-item>
        <el-form-item label="楼层" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="A区(左)" value="diningtable_1"></el-option>
            <el-option label="B区(右)" value="diningtable_2"></el-option>
          </el-select>
        </el-form-item>
        <div v-for="people in form.allPeopleName" :key="people.sitId">
          <el-form-item label="people" :label-width="formLabelWidth">
            <el-input
              v-model="people.name"
              placeholder="务必将所有人的姓名填写完整！"
              autocomplete="off"
              style="width: 50%;"
            ></el-input>
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="recommendSit">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      :before-close="recommendFoodHandleClose"
      title="推荐食品"
      :visible.sync="showRecommendFoodForm"
      width="30%"
        >
      <div class="product-main">
        <h4>{{ recommendFood.shopname }}</h4>
        <img
          v-if="recommendFood.img != null"
          :src="
            require('D:/vueProject/vue_proj_01/src/assets/imgs/' +
              recommendFood.img)
          "
          style="height: 200px; width: 300px;"
        />
        <h4>{{ recommendFood.foodname }}</h4>

        <div>
          <el-input-number
            v-model="recommendFood.num"
            :min="0"
            :max="10"
            size="small"
            label="描述文字"
          ></el-input-number>
        </div>
        <div class="product-cost">¥ {{ recommendFood.price }}</div>
        <el-button type="primary" size="mini" @click="addcart(recommendFood)"
          >加入购物车</el-button
        >
        <!-- <div class="product-add-cart" @click.prevent="handleCart">加入购物车</div> -->
        <!-- </router-link> -->
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelAddCar">取 消</el-button>
        <!-- <el-button type="primary" @click="recommendConfirm()">确 定</el-button> -->
      </span>
    </el-dialog>
     <el-dialog :before-close="cancel" title="购物车" :visible.sync="outerVisible">
      <el-dialog
        width="30%"
        title="扫码支付"
        :visible.sync="innerVisible"
        append-to-body
        
      >
        <div align="center">
          <img
            src="../assets/imgs/1586270584469.jpg"
            style="width:200px ; height:300px"
          />
        </div>
      </el-dialog>
      <el-table
        height="300"
        ref="multipleTable"
        :data="cart"
        tooltip-effect="dark"
        style="width: 100% ;
    font-size:10px"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="foodname" label="食品名" width="120">
        </el-table-column>
        <el-table-column label="添加日期" width="120">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column prop="num" label="数量" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="allcost" label="总价(元)" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="shopname" label="店铺名" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 20px">
        <el-button @click="toggleSelection()">取消选择</el-button>
      </div>
      <div slot="footer" class="dialog-footer">
        <div class="product-cost">总价：{{ this.allCost }}元</div>
        <el-button @click="cancel ">取 消</el-button>
        <el-button type="primary" @click="innerVisible = true">下单</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: {
        sit: false,
        food: false,
        cart: false
      },
      tableArry: [],
      isCollapse: true,
      dialogTableVisible: false,
      dialogFormVisible: false,
      formLabelWidth: '120px',
      peopleNumber: 0,
      form: {
        peopleNumber: 1,
        token: window.sessionStorage.getItem('token'),
        region: '',
        allPeopleName: []
      },
      showConfirm: false,
      info: {
        image: 'asd.jpg',
        id: 1,
        name: '西瓜',
        color: '#dac272',
        cost: 15.5,
        num: 0
      },
      allFood: [],
      recommendFood: {},
      showRecommendFoodForm: false,
      tableData: [],
      //-------------------cart------------------
      allCost: 0,
      multipleSelection: [],
      cart: [],
      outerVisible: false,
      innerVisible: false,

    }
  },
  methods: {
    loginOut() {
      window.sessionStorage.clear() //清空token
      this.$router.push('/login') //跳转到login界面
    },
    async toSitOne() {
      // this.$router.push('/home')
      this.show.sit = true
      this.show.food = false
      const { data: res } = await this.$http.get('/inLeft')
      this.info.image = require('D:/vueProject/vue_proj_01/src/assets/imgs/asd.jpg')
      this.tableArry = res
      this.showConfirm = false
      console.log('One')
      console.log(this.tableArry)
    },
    async toSitTwo() {
      // this.$router.push('/home')

      this.show.sit = true
      this.show.food = false
      const { data: res } = await this.$http.get('/inRight')
      this.tableArry = res
      this.showConfirm = false
      console.log('Two')
      console.log(this.tableArry)
    },
    async recommendSit() {
      // this.$router.push('/home')
      console.log(this.form.peopleNumber)
      // this.dialogFormVisible = false
      if (this.form.peopleNumber > 12) {
        this.$message('人数上限为12')
        return
      } else {
        const { data: res } = await this.$http.post('/recommendSit', this.form)
        console.log(this.form.peopleNumber)
        if (res.meta.status === 10005) {
          console.log(res)
          alert(res.meta.message)
          this.showConfirm = false
          console.log('error')
        } else {
          this.tableArry = res.tables
          console.log(res)
          // this.$router.push('/home')
          this.show.sit = true
          this.show.food = false
          this.showConfirm = true
          console.log('alert-success')
        }
        this.dialogFormVisible = false
      }
    },
    async selectConfirm() {
      this.showConfirm = false
      console.log(window.sessionStorage.getItem('id'))
      const { data: res } = await this.$http.post('/selectConfirm', {
        tables: this.tableArry,
        location: this.form.region,
        userId: window.sessionStorage.getItem('id'),
        allPeopleName: this.form.allPeopleName,
        token: window.sessionStorage.getItem('token'),
        peopleNumber: this.form.peopleNumber
      })
      console.log('sit')
      console.log(res)
      if (res.status == '50001') {
        this.$message(res.message)
      } else {
        alert('选座成功，请在两分钟内就做!!')
        if(this.form.region == 'diningtable_1')
        this.toSitOne()
        else
        this.toSitTwo()
      }
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
    peopleNumberBlur() {
      if (this.form.allPeopleName.length < this.form.peopleNumber) {
        for (
          let index = this.form.allPeopleName.length;
          index < this.form.peopleNumber;
          index++
        ) {
          var temp = {}
          temp.sitId = index + 1
          temp.name = ''
          this.form.allPeopleName.push(temp)
        }
      } else {
        for (
          let index = this.form.allPeopleName.length;
          index > this.form.peopleNumber;
          index--
        ) {
          this.form.allPeopleName.pop()
        }
      }
    },
    showDialogForm() {
      this.dialogFormVisible = true
      this.form.allPeopleName = []
      for (let index = 0; index < this.form.peopleNumber; index++) {
        var temp = {}
        temp.sitId = index + 1
        temp.name = ''
        this.form.allPeopleName.push(temp)
      }
    },
   
    handleChange() {},

  


   
    //-------------------------------------Food--------------------
    async toSelectFood() {
      this.show.sit = false
      this.show.food = true
      this.allFood = []
      const { data: res } = await this.$http.get('selectAllFood', {})
      var temp = []
      for (let index = 0; index < res.length; index++) {
        res[index].num = 0
        temp.push(res[index])
        if ((index + 1) % 6 == 0) {
          this.allFood.push(temp)
          temp = []
        }
      }
      this.allFood.push(temp)
      temp = []
      console.log(this.allFood)
      this.$emit('allFood', this.allFood)
    },
    //----------------------------------RecommendFood--------------------------
    async showRecommendFood() {
      if (this.allFood.length == 0) {
        //  console.log("allFood==Null")
        const { data: res } = await this.$http.get('selectAllFood', {})
        console.log(res)
        this.recommendFood = res[Math.floor(Math.random() * res.length)]
        this.recommendFood.num = 0
        console.log(this.recommendFood.num)
        console.log(this.recommendFood)
      } else {
        console.log(this.allFood)
        const num = Math.floor(
          Math.random() *
            ((this.allFood.length - 1) * 6 +
              this.allFood[this.allFood.length - 1].length)
        )
        console.log(num)
        const row = Math.floor(num / 6)
        const col = num % 6
        console.log(row + '  ' + col)
        this.recommendFood = this.allFood[row][col]
        this.recommendFood.num = 0
        console.log(this.recommendFood.num)
      }
      this.showRecommendFoodForm = true
    },
    cancelAddCar() {
      this.showRecommendFoodForm = false
      this.toSelectFood()
      this.show.sit = false
      this.show.food = true
    },
    recommendFoodHandleClose(done) {
      this.showRecommendFoodForm = false
      this.toSelectFood()
      this.show.sit = false
      this.show.food = true
    },
    async addcart(item) {
      if (item.num == 0) {
        alert('食品数量不能为0')
        return
      }
      const { data: res } = await this.$http.post('addCart', {
        cart: item,
        id: window.sessionStorage.getItem('id')
      })
      this.showRecommendFoodForm = false
      this.toSelectFood()
      this.show.sit = false
      this.show.food = true
    },
    //--------------------------------------Cart---------------------
        async toCart(){
        this.outerVisible = true
        const { data: res } = await this.$http.post('getCart', {id:window.sessionStorage.getItem('id')})
        
        for (let index = 0; index < res.cart.length; index++) {
            res.cart[index].allcost = (res.cart[index].price * res.cart[index].num)
            res.cart[index].date = this.timestampToTime (res.cart[index].date) 
        }
        this.cart = res.cart
        console.log(res)
      },
           timestampToTime (cjsj) {
        var date = new Date(cjsj) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '-'
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-'
        var D = date.getDate() + ' '
        var h = date.getHours() + ':'
        var m = date.getMinutes() + ':'
        var s = date.getSeconds()
        return Y+M+D+h+m+s
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
      this.allCost = 0
      for (let index = 0; index < val.length; index++) {
        this.allCost += val[index].allcost
      }
    },
    handleEdit(index, row) {
      console.log(index, row)
    },
    handleDelete(index, row) {
      console.log('11111111')
      console.log(index, row)
      console.log('22222222')
    },
    cancel(){
      this.outerVisible = false
       this.toSelectFood()
      this.show.sit = false
      this.show.food = true
   
    }
  }
}
</script>
<style lang="less" scoped>
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between; //两边对齐
  padding-left: 0; //左边距0
  align-items: center;
  color: #fff;
  font-size: 20px;
  > div {
    //标签选择器
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
}
.el-aside {
  background-color: white;
}
.el-main {
  background-color: #eaedf1;
}
.home-container {
  height: 100%;
}
// .table{
//   padding: 10px;
// box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
// margin: 10px;
// }
.all {
  width: 1510px;
  height: 100%;
}
.confirm {
  position: absolute;
  display: flex;
  align-items: center;
}
.product {
  width: 100%;
  float: left;
}
.product-main {
  display: block;
  margin: 16px;
  padding: 16px;
  border: 1px solid #dddee1;
  border-radius: 6px;
  overflow: hidden;
  background: #aedd81;
  text-align: center;
  position: relative;
}
.product-main img {
  width: 100%;
}
h4 {
  color: #222;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 13px;
}
/* .product-main:hover h4{
        color: #0070c9;
    } */
.product-color {
  display: block;
  width: 16px;
  height: 16px;
  border: 1px solid #dddee1;
  border-radius: 50%;
  margin: 6px auto;
}
.product-cost {
  color: #de4037;
  margin-top: 6px;
}
.product-add-cart {
  display: none;
  padding: 4px 8px;
  background: #2d8cf0;
  color: #fff;
  font-size: 12px;
  border-radius: 3px;
  cursor: pointer;
  position: absolute;
  top: 5px;
  right: 5px;
}
.product-main:hover .product-add-cart {
  display: inline-block;
}
</style>
