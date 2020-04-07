<template>
  <div>
    <div class="register-wrapper">
      <div id="register">
        <p class="title">登录</p>
        <el-form
        ref="loginFromRef"
      :model="loginFrom"
      :rules="rules"     
          status-icon
          label-width="0"
          class="demo-ruleForm"
        >
          <el-form-item prop="username">
            <el-input
              v-model="loginFrom.username"
            
              placeholder="请输如用户名"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              v-model="loginFrom.password"
            
              placeholder="输入密码"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="loginVerify"
              style="width:100%;"
            >登录</el-button
            >
           <p class="register" @click="gotoRegister">没有账号？立即注册</p>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
   data() {
    return {
      loginFrom: {
        username: 'lisi',
        password: '741852aa'
      },
      // 表单验证，需要在 el-form-item 元素中增加 prop 属性
      rules: {
        username: [
          { require: true, message: '必须填写用户名', trigger: 'blur' },
          { min: 4, max: 12, message: '长度在4到12个字符之间', trigger: 'blur' }
        ],
        password: [
          { require: true, message: '必须填写密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在6到15个字符之间', trigger: 'blur' }
        ]
      },
      // 对话框显示和隐藏
      dialogVisible: false
    }
  },
  methods: {
    resetLoginFrom() {
      this.$refs.loginFromRef.resetFields()
    },
    loginVerify() {
      this.$refs.loginFromRef.validate(async valid => {
        console.log(valid)
        if (!valid) return
        const { data: res } = await this.$http.post('login', this.loginFrom) //从返回的对象中拿到data属性，并重命名为res
        console.log(res)
        if (res !== null && res.meta.status == 1)
          return this.$message.error('登陆失败')
        this.$message.success('登陆成功')
        console.log(res)
        //获取token存入sessionStorage
        window.sessionStorage.setItem('token', res.token)
        window.sessionStorage.setItem('id', res.userId)
        console.log(res.token)
        //通过编程式导航跳转到主页
        this.$router.push('/home')
        const data = await this.$http.post('login', this.loginFrom)
        console.log(data)
      })
    },
    gotoRegister() {
      setTimeout(() => {
        this.$router.push({
        path: '/register'
      })
      }, 300);
      
    }
  }
}
</script>
<style scoped>
.loading-wrapper {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: #aedff8;
  display: flex;
  align-items: center;
  justify-content: center;
}
.register-wrapper img {
  position: absolute;
  z-index: 1;
}
.register-wrapper {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
}
#register {
  max-width: 340px;
  margin: 60px auto;
  background: #fff;
  padding: 20px 40px;
  border-radius: 10px;
  position: relative;
  z-index: 9;
}
.title {
  font-size: 26px;
  line-height: 50px;
  font-weight: bold;
  margin: 10px;
  text-align: center;
}
.el-form-item {
  text-align: center;
}
.register {
  margin-top: 10px;
  font-size: 14px;
  line-height: 22px;
  color: #1ab2ff;
  cursor: pointer;
  text-align: left;
  text-indent: 8px;
  width: 160px;
}
.login:hover {
  color: #2c2fd6;
}
.code >>> .el-form-item__content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.code button {
  margin-left: 20px;
  width: 140px;
  text-align: center;
}
.el-button--primary:focus {
  background: #409eff;
  border-color: #409eff;
  color: #fff;
}
</style>
