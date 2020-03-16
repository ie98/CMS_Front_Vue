<template>
  <div>
    <h1>HOME</h1>
    <el-button type="info" @click="loginOut">退出</el-button>
  </div>
</template>
<script>
export default {
  methods: {
    loginOut() {
      window.sessionStorage.clear() //清空token
      this.$router.push('/login') //跳转到login界面
    }
  }
}
</script>
<style lang="less" scoped></style>
