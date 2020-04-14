<template>
  <div class="all">
    <el-container class="home-container">
      <el-header>
        <div>
          <img src="" alt="" />
          <span>便捷食堂(手机端建议横屏显示，双击缩小) </span>
        </div>
     <el-button type="info" @dblclick="toggleFullScreen($event)"  >全屏</el-button>
      <el-button type="info" @click="showAllFood"  >allFood</el-button>
        <el-button type="info" @click="loginOut">退出</el-button>
      </el-header>
      <el-container>
        <el-aside width="139px">
          <!-- 整个菜单 -->
          <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
            <el-radio-button :label="false">展开</el-radio-button>
            <el-radio-button :label="true">收起</el-radio-button>
          </el-radio-group>  -->
          <el-menu
          default-active="2"
            class="el-menu-vertical-demo"

          >
            <!-- 一级菜单 -->
            <el-submenu index="1">
              <!-- 设置图标及名称 -->
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>选位置</span>
              </template>
              <el-menu-item-group>
                <template slot="title">中间过道分隔</template>
                <!-- 二级菜单 -->
                <el-menu-item index="/1-1" 
                @click="show.left = true , show.right = false"
                >
                  <template slot="title">
                    <i class="el-icon-circle-plus"></i> 
                    <span>A区(左)</span>
                  </template>
                </el-menu-item>
                <el-menu-item index="1-2" 
                @click="show.right = true , show.left = false">
                  <template slot="title">
                    <i class="el-icon-circle-plus"></i>
                    <span>B区(右)</span>
                  </template></el-menu-item
                >
                <el-menu-item index="1-3" 
                @click="show.recommendSit = true"
                  >
                  <i class="el-icon-circle-check"></i>
                    <span>系统推荐</span></el-menu-item
                >
              </el-menu-item-group>
            </el-submenu>

            <!-- <el-menu-item index="2">
              <i class="el-icon-menu"></i>
              <span slot="title">随机选餐</span>
            </el-menu-item> -->

            <!-- 一级菜单 -->
            <el-submenu index="2"
            router>
              <!-- 设置图标及名称 -->
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>美食</span>
              </template>
              <el-menu-item-group>
             
                <!-- 二级菜单 -->
                <el-menu-item index="/allFood" >
                  <template slot="title">
                    <i class="el-icon-circle-plus"></i>
                    <span>选餐</span>
                  </template>
                </el-menu-item>
                 <el-menu-item index="/recommendFood" 
                  >
                  <i class="el-icon-circle-check"></i>
                    <span>系统推荐</span></el-menu-item
                >
                  <el-menu-item index="/cart" >
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
            <v-left v-if="show.left" :setTables="tables"></v-left>
<v-right v-if="show.right" :setTables="tables" ></v-right>
<v-recommendSit v-if="show.recommendSit" @getTables = "getTables"></v-recommendSit>
            <router-view></router-view>

           
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  
    <!-- <el-button type="text" @click="outerVisible = true">购物车</el-button> -->
  </div>
</template>
<script>
import Left from './Location/Left'
import Right from './Location/Right'
import RecommendSit from './Location/RecommendSit'
export default {
  components:{
    'v-left':Left,
    'v-right':Right,
    'v-recommendSit':RecommendSit
  },
  data() {
    return {
      allFood:[],
      tables:[],
      isFullscreen:true,
      
      isCollapse: true,
      dialogTableVisible: false,
      dialogFormVisible: false,
      // formLabelWidth: '120px',
      peopleNumber: 0,
      show:{
        left:false,
        right:false,
        recommendSit:false
      }
  
    }
  },
  methods: {
    loginOut() {
      window.sessionStorage.clear() //清空token
      this.$router.push('/login') //跳转到login界面
    },

    showAllFood(){
      console.log('allFood'+this.allFood+"..")
    },
     getAllFood(item){
       console.log("getAllFood")
       this.allFood = item
     },

 
    
  

   toggleFullScreen(e){
          this.isFullscreen=!this.isFullscreen;
          var el=e.srcElement||e.target;//target兼容Firefox
          this.FullScreen(el);
      },
      getTables(values){
        this.tables = values.tables
        if(values.form.region == 'diningtable_1')
            show.left = true
            else
            show.right = true
      }
 
     
      
  
      
      //       handleClose(done) {
      //   this.$confirm('确认关闭？')
      //     .then(_ => {
      //       done();
      //     })
      //     .catch(_ => {});
      // }
     
      
  },
 
}
import "../assets/css/home.css"
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
</style>
