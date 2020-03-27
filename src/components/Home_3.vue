<template>
  <el-container class="home-container">
    <el-header>
      <div>
        <img src="" alt="" />
        <span>便捷食堂 </span>
      </div>
      <el-button type="info" @click="loginOut">退出</el-button>
    </el-header>
    <el-container>
      <el-aside width="139px">
        <!-- 整个菜单 -->
        <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
          <el-radio-button :label="false">展开</el-radio-button>
          <el-radio-button :label="true">收起</el-radio-button>
        </el-radio-group>
        <el-menu
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          :collapse="isCollapse"
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
                  <span>一楼</span>
                </template>
              </el-menu-item>
              <el-menu-item index="1-2" @click="toSitTwo">
                <template slot="title">
                  <i class="el-icon-circle-plus"></i>
                  <span>二楼</span>
                </template></el-menu-item
              >
              <el-menu-item index="1-3">系统推荐</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">选餐</span>
          </el-menu-item>
          <el-menu-item index="3" disabled>
            <i class="el-icon-document"></i>
            <span slot="title">导航三</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">导航四</span>
          </el-menu-item>
        </el-menu></el-aside
      >
      <el-container>
        <el-main>
          <div>
            <el-row :gutter="20">
              <div  v-for="TableItem in tableArry" :key="TableItem.id">
                <el-col :span="4">
                  <el-row>
                    <div v-for="item in TableItem.chairs" :key="item.id">
                      <el-col :span="8">
                        <el-button
                          type="primary"
                          style="margin:10px 10px;padding:15px;"
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
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      tableArry: [],
      isCollapse: true
    }
  },
  methods: {
    loginOut() {
      window.sessionStorage.clear() //清空token
      this.$router.push('/login') //跳转到login界面
    },
    async toSitOne() {
      const { data: res } = await this.$http.get('/inFirstFloor')
      this.tableArry = res
      console.log('One')
      console.log(this.tableArry)
    },
    async toSitTwo() {
      const { data: res } = await this.$http.get('/inSecondFloor')
      this.tableArry = res
      console.log('Two')
      console.log(this.tableArry)
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
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
</style>
