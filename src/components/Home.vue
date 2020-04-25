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
          <el-menu class="el-menu-vertical-demo">
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
                <el-menu-item index="2-1" @click="toSelectShop">
                  <template slot="title">
                    <i class="el-icon-circle-plus"></i>
                    <span>选餐</span>
                  </template>
                </el-menu-item>
                <el-menu-item index="2-2" @click="showRecommendFood">
                  <i class="el-icon-circle-check"></i>

                  <span>系统推荐</span></el-menu-item
                >
                <el-menu-item index="2-3" @click="toCart">
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
            <div v-if="show.Shop">
              <div v-for="items in allShop" :key="items.id">
                <el-row>
                  <div v-for="item in items" :key="item.id">
                    <el-col :span="8">
                      <!-- <router-link :to="'/product/' + info.id" class="product-main"  > -->
                      <div class="product-main" style="height:200px">
                        <el-row>
                          <el-col :span="8">
                            <img v-if="item.logo != ''"
                              :src=" require('D:/vueProject/vue_proj_01/src/assets/imgs/' +
                                  item.logo)"
                              style="height: 100px; width: 100px  ;"
                            />
                            <img v-if="item.logo == ''"
                              src=""
                              style="height: 100px; width: 100px  ;"
                            />
                            <el-button
                              type="primary"
                              @click="showTheShopFood(item)"
                            >
                              进入店铺</el-button
                            >
                          </el-col>
                          <el-col :span="16">
                            <h2 style="margin-top:0">{{ item.shopname }}</h2>
                            <div class="aline"></div>

                            <span style="color:#5c4033 ;font-size:13px"
                              ><span style="font-size:20px ; color:#D98719"
                                >简介:</span
                              >{{ item.described }}</span
                            >

                            <div class="product-cost">{{ item.sales }}</div>
                          </el-col>
                        </el-row>

                        <!-- <div class="product-add-cart" @click.prevent="handleCart">加入购物车</div> -->
                        <!-- </router-link> -->
                      </div>
                    </el-col>
                  </div>
                </el-row>
              </div>
            </div>
            <div v-if="show.food">
              <div>
                <div v-for="temps in allFood" :key="temps.id">
                  <el-row>
                    <div v-for="temp in temps" :key="temp.id">
                      <el-col :span="4">
                        <!-- <router-link :to="'/product/' + info.id" class="product-main"  > -->
                        <div class="product-main">
                          <h4>{{ temp.shopname }}</h4>
                          <img
                            :src="
                              require('D:/vueProject/vue_proj_01/src/assets/imgs/' +
                                temp.img)
                            "
                            style="height: 100px; width: 80%;"
                          />
                          <h4>{{ temp.foodname }}</h4>

                          <div>
                            <el-input-number
                              v-model="temp.num"
                              :min="0"
                              :max="10"
                              size="small"
                              label="描述文字"
                            ></el-input-number>
                          </div>
                          <div class="product-cost">¥ {{ temp.price }}</div>
                          <el-button
                            type="primary"
                            size="mini"
                            @click="addcart(temp)"
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
    <el-dialog
      :before-close="cancelShowCart"
      title="购物车"
      :visible.sync="outerVisible"
    >
      <!-- <el-dialog
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
      </el-dialog> -->
      <div style="margin-bottom:50px" v-for="item in cart" :key="item.id">
        <el-card>
          <span>{{ item.shopname }}</span>

          <el-table
            height="300"
            ref="multipleTable"
            :data="item.ShopFood"
            tooltip-effect="dark"
            style="width: 100% ;
    font-size:10px"
            @selection-change="handleSelectionChange($event , item.id)"
          >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column prop="foodname" label="食品名" width="100">
            </el-table-column>
            <el-table-column label="添加日期" width="120">
              <template slot-scope="scope">{{ scope.row.ChinaDate }}</template>
            </el-table-column>
            <el-table-column
              prop="num"
              label="数量"
              width="50"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="allcost"
              label="总价(元)"
              width="80"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="shopname"
              label="店铺名"
              width="120"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column label="操作" width="100">
              <template slot-scope="scope">
                <!-- <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            > -->
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.row)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <div class="product-cost">总价：{{ allCost[item.id].num }}元</div>
          <el-button type="primary" @click="commitRecord(item.id,item.shopname)">下单</el-button>
        </el-card>
      </div>
      <!-- <div style="margin-top: 20px">
        <el-button @click="toggleSelection()">取消选择</el-button>
      </div> -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelShowCart">取 消</el-button>
        <!-- <el-button type="primary" @click="innerVisible = true">下单</el-button> -->
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      showShop: false,
      show: {
        sit: false,
        Shop: false,
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
      //=======================Food And Shop
      allShop: [],
      allFood: [],
      recommendFood: {},
      showRecommendFoodForm: false,
      tableData: [],
      //-------------------cart------------------
      //allCost:[{num}]  //存放cart中对应id的总价
      allCost: [],
      multipleSelection: [],
      //cart格式   
      // cart:[
      //   {   //一个店铺 一个对象
      //     ShopFood:[],  //该店铺在购物车中的food
      //     shopname:'',  
      //     id:0,  // v-for渲染时，为了获取总价allCost而设置的id
      //   }
      // ]
      cart: [],
      outerVisible: false,
      innerVisible: false,
      //订单信息
      recordInfo:{
          out_trade_no:'', // 订单ID 店铺ID + 食品ID
          subject:'',//对象  店铺名
          total_amount:'',//金额
          body:'',//描述 食品名之和
          timeout_express:'5m',//超订单过期时间 5分钟，
          product_code:'' ,//商品码 食品Id
          username:window.sessionStorage.getItem('username'),
          userid:window.sessionStorage.getItem('id'),
          dates:[]
      }
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
      // this.info.image = require('D:/vueProject/vue_proj_01/src/assets/imgs/asd.jpg')
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
        if (this.form.region == 'diningtable_1') this.toSitOne()
        else this.toSitTwo()
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
    async toSelectShop() {
      this.allShop = []
      const { data: res } = await this.$http.get(`/getAllShop`, {
        params: {}
      })
      var temp = []
      for (let index = 0; index < res.length; index++) {
        temp.push(res[index])
        if (res[index].logo == null){
          res[index].logo = ''
        }
        if ((index + 1) % 3 == 0) {
          this.allShop.push(temp)
          temp = []
        }
      }
      this.allShop.push(temp)
      console.log(res)
      // this.show.shop = true
      console.log(this.allShop)
      this.show.food = false
      this.show.sit = false
      this.show.Shop = true
    },
    async showTheShopFood(val) {
      this.allFood = []
      const { data: res } = await this.$http.get('showTheShopFood', {
        params: { shopname: val.shopname }
      })
      console.log(res)
      if (res.meta.status == 1) {
        this.show.sit = false
        this.show.Shop = true
        this.show.food = false
        return this.$message.error('error!!!')
      }

      var temp = []
      for (let index = 0; index < res.foods.length; index++) {
        res.foods[index].num = 0
        temp.push(res.foods[index])
        if ((index + 1) % 6 == 0) {
          this.allFood.push(temp)
          temp = []
        }
      }
      this.allFood.push(temp)
      temp = []
      console.log(this.allFood)
      this.$emit('allFood', this.allFood)
      this.show.sit = false
      this.show.Shop = false
      this.show.food = true
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
      // this.toSelectFood()
      this.show.sit = false
      this.show.food = true
    },
    recommendFoodHandleClose(done) {
      this.showRecommendFoodForm = false
      // this.toSelectFood()
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
      console.log(item)
      this.showRecommendFoodForm = false
      this.recommendFood = {}
      // this.toSelectFood()
      this.show.sit = false
      this.show.food = true
      this.$message.success('添加成功！！')
    },
    //--------------------------------------Cart---------------------
    async toCart() {
      this.cart = []
      this.outerVisible = true
      const { data: res } = await this.$http.post('getCart', {
        id: window.sessionStorage.getItem('id')
      })
      let shops = []
      let object = {}
      let sn = { name: '' }
      var id = 0
      for (let index = 0; index < res.cart.length; index++) {   // 遍历所所有值
        res.cart[index].allcost = res.cart[index].price * res.cart[index].num
        let date = res.cart[index].date
        res.cart[index].ChinaDate = this.timestampToTime(date)
        let index2 = 0
        for (index2 = 0; index2 < this.cart.length; index2++) {  //寻找食品对应的店铺
          if (res.cart[index].shopname == this.cart[index2].shopname) {
            this.cart[index2].ShopFood.push(res.cart[index])
            break
          }
        }
        if (index2 == this.cart.length) {  //没有找到店铺则新建一个店铺对象object ，放入cart中
          shops.push(res.cart[index])
          object.ShopFood = shops
          object.shopname = res.cart[index].shopname
          object.id = id
          this.cart.push(object)
          let temp = { num: 0 }
          this.allCost.push(temp)
          let selectFood = []
          this.multipleSelection.push(selectFood)
          id = id + 1
          shops = []
          object = {}
        }
      }

      console.log(this.cart)
    },
    timestampToTime(cjsj) {
      var date = new Date(cjsj) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + '-'
      var M =
        (date.getMonth() + 1 < 10
          ? '0' + (date.getMonth() + 1)
          : date.getMonth() + 1) + '-'
      var D = date.getDate() + ' '
      var h = date.getHours() + ':'
      var m = date.getMinutes() + ':'
      var s = date.getSeconds()
      return Y + M + D + h + m + s
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
    // handleSelectionChange(val) {
    //   this.allCost[val.id].num = 0
    //   console.log(val)
    //   this.multipleSelection = val.ShopFood
    //   // let temp = {num : 0}
    //   // console.log(val.id)
    //   // this.allCost[val.id].push(temp)
    //   for (let index = 0; index < val.ShopFood.length; index++) {
    //     this.allCost[val.id].num += val.ShopFood[index].allcost
    //   }
    // },
    handleSelectionChange( selection , id) {
      console.log(selection)
      this.allCost[id].num = 0
      console.log(selection)
      this.multipleSelection[id] = selection
      console.log("multipleSelection")
      console.log(id)
      console.log(this.multipleSelection[id])
      // let temp = {num : 0}
      // console.log(val.id)
      // this.allCost[val.id].push(temp)
      for (let index = 0; index < selection.length; index++) {
        this.allCost[id].num += selection[index].allcost
      }
    },
    handleEdit(index, row) {
      console.log(index, row)
    },
    async handleDelete(row) {
      console.log(row)
      const { data: res } = await this.$http.delete(`/deleteCartItem/${window.sessionStorage.getItem('id')}`, row)
      console.log(row)
      this.toCart()
      
    },
    cancelShowCart() {
      this.cart = []
      this.outerVisible = false
      // this.toSelectFood()
      this.show.sit = false
      this.show.food = true
    },
    //提交订单
    async commitRecord( id ,shopname){
      if(this.multipleSelection[id].length == 0 )
      return this.$message.error("请选择商品")
      console.log(this.multipleSelection[id])  
      this.multipleSelection[id].forEach((item , i) => {
        this.recordInfo.out_trade_no += item.id
        this.recordInfo.body += item.foodname
        console.log("item.date")
        console.log(item.date)
        console.log("item.ChinaDate")
        console.log(item.ChinaDate)
        this.recordInfo.dates.push(item.date)
        
        if(i != this.multipleSelection[id].length-1)
        this.recordInfo.body += ','
        
      });
      console.log(this.recordInfo.dates)
       this.recordInfo.subject = shopname
      this.recordInfo.total_amount = this.allCost[id].num
      this.recordInfo.product_code = this.recordInfo.out_trade_no
      if(this.allCost[id].num == 0){
        this.$message.error("金额不能为0！！！")
      }
      console.log( this.recordInfo)
         const { data: res } = await this.$http.post(`/pay`, this.recordInfo)
        console.log(res)
         this.cart = []
         this.outerVisible = false
        let divForm = document.getElementsByTagName('divform')
            if (divForm.length) {
              document.body.removeChild(divForm[0])
            }
            const div = document.createElement('divform')
            div.innerHTML = res 
            document.body.appendChild(div)
            // document.forms[0].setAttribute('target', '_blank') // 加了_blank可能出问题所以我注释了
            document.getElementsByName('punchout_form')[0].submit()  // 提交name为punchout_form的dom
        
       
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
  border: 4px solid #d98719;
  border-radius: 6px;

  overflow: hidden;
  background: #eaedf1;
  text-align: center;
  position: relative;
}
.product-main img {
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
.el-card {
  /* //提高优先级 */
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15) !important;
  margin-bottom: 20px !important;
}
.el-row {
  margin-top: 20px !important;
}
.col1 {
  font-size: 15px;
  color: #5c3317;
  word-break: break-all;
}
.aline {
  background-color: #e6e3e3;
  height: 1px;
}
</style>
