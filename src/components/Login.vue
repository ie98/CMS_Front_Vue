<template>
  <div class="case">
    <div class="box">
      <!-- 头像区 -->
      <div class="avatar_box">
        <img src="../assets/imgs/logo.png" />
      </div>
      <!-- 信息填写区 -->
      <el-form
        ref="loginFromRef"
        label-width="0px"
        class="fromC"
        :model="loginFrom"
        :rules="loginRules"
      >
        <!--  用户名区域 -->
        <el-form-item prop="username">
          <el-input
            prefix-icon="iconfont icon-user"
            v-model="loginFrom.username"
          >
          </el-input>
        </el-form-item>
        <!-- 密码区域 -->
        <el-form-item prop="password">
          <el-input
            prefix-icon="iconfont icon-3702mima"
            v-model="loginFrom.password"
            type="password"
          >
          </el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="primary" round @click="loginVerify">登录</el-button>
          <el-button type="info" round @click="resetLoginFrom">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div>
      {{ loginFrom.username }}
      {{ loginFrom.password }}
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loginFrom: {
        username: 'admin',
        password: '123456'
      },
      loginRules: {
        username: [
          { require: true, message: '必须填写用户名', trigger: 'blur' },
          { min: 4, max: 12, message: '长度在4到12个字符之间', trigger: 'blur' }
        ],
        password: [
          { require: true, message: '必须填写密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在6到15个字符之间', trigger: 'blur' }
        ]
      }
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
        if (res !== null && res.meta.status == 1) return this.$message.error('登陆失败')
        this.$message.success('登陆成功')
        //获取token存入sessionStorage
        window.sessionStorage.setItem('token', res.token)
        console.log(res.token)
        //通过编程式导航跳转到主页
        this.$router.push('/home')
        const data = await this.$http.post('login', this.loginFrom) 
        console.log(data)
      })
    }
  }
}
</script>
<style lang="less" scoped>
.case {
  background-color: #55efc4;
  height: 100%;
}
.box {
  height: 300px;
  width: 450px;
  background-color: white;
  position: absolute;
  border-radius: 3px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.avatar_box {
  height: 130px;
  width: 130px;
  border: 1px solid #eee;
  border-radius: 50%; //65px
  padding: 10px;
  box-shadow: 0 0 10px #ddd; //设置阴影，向外扩散10px
  position: absolute; //设置绝对位置
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #81ecec;
  img {
    height: 100%;
    width: 100%;
    border-radius: 50%;
    background-color: #81ecec;
  }
}
.btns {
  display: flex;
  justify-content: flex-end;
}
.fromC {
  width: 100%;
  position: absolute;
  //top: 30%;
  bottom: 0; //靠底部
  padding: 20px;
  box-sizing: border-box;
}
</style>
