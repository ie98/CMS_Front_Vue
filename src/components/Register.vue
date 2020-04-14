<template>
  <div>
    <div class="register-wrapper">
      <div id="register">
        <p class="title">注册</p>
        <el-form
          :model="ruleForm2"
          status-icon
          :rules="rules2"
          ref="ruleForm2"
          label-width="0"
          class="demo-ruleForm"
        >
          <el-form-item prop="username">
            <el-input
              v-model="ruleForm2.username"
              auto-complete="off"
              placeholder="请输如用户名"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              v-model="ruleForm2.password"
              auto-complete="off"
              placeholder="输入密码"
            ></el-input>
          </el-form-item>
          <el-form-item prop="checkPass">
            <el-input
              type="password"
              v-model="ruleForm2.checkPass"
              auto-complete="off"
              placeholder="确认密码"
            ></el-input>
          </el-form-item>
          <el-form-item > 
          <el-select v-model="ruleForm2.college" placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
          </el-form-item>
          <el-form-item prop="grade"> 
            <el-select v-model="ruleForm2.grade" placeholder="请选择">
    <el-option
      :label="16"
      :value="16">
    </el-option>
    <el-option
      :label="17"
      :value="17">
    </el-option>
    <el-option
      :label="18"
      :value="18">
    </el-option>
    <el-option
      :label="19"
      :value="19">
    </el-option>
    <el-option
      :label="20"
      :value="20">
    </el-option>
  </el-select>
          </el-form-item>
          <el-form-item prop="phone">
            <el-input v-model="ruleForm2.phone" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="submitForm('ruleForm2')"
              style="width:100%;"
              >注册</el-button
            >
            <p class="login" @click="gotoLogin">已有账号？立即登录</p>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
export default {

  data() {
    // <!--验证密码-->
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm2.checkPass !== '') {
          this.$refs.ruleForm2.validateField('checkPass')
        }
        callback()
      }
    }
    // <!--二次验证密码-->
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm2.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      ruleForm2: {
        username: '',
        password: '',
        checkPass: '',
        college:'',
        grade:16,
        phone:''
      },
      rules2: {
        pass: [{ validator: validatePass, trigger: 'change' }],
        checkPass: [{ validator: validatePass2, trigger: 'change' }],
        username: [
          { require: true, message: '必须填写用户名', trigger: 'blur' },
          { min: 4, max: 12, message: '长度在4到12个字符之间', trigger: 'blur' }
        ]
      },
      flag: true,
       options: [{
          value: '计算机',
          label: '计算机'
        }, {
          value: '软件工程',
          label: '软件工程'
        }, {
          value: '电气',
          label: '电气'
        }, {
          value: '网络通信',
          label: '网络通信'
        }, {
          value: '信息安全',
          label: '信息安全'
        }]
    }
  },
  methods: {
    // <!--提交注册-->
    submitForm(formName) {
     if(this.checkPhone())  {
 this.$refs[formName].validate(async valid => {
        if (valid) {
          const { data: res } = await this.$http.post('/register', this.ruleForm2)
          console.log(res)
          if (res.status == '0') {
            setTimeout(() => {
              this.$message('注册成功')
               this.$router.push({
              path: '/login'
            })
            }, 1000)
           
          } else {
            this.$message(res.message)
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
     }
     
    },
    // <!--进入登录页-->
    gotoLogin() {
      setTimeout(() => {
        this.$router.push({
        path: '/login'
      })
      }, 300);
      
    },
     checkPhone(){ 
    if(!(/^1[3456789]\d{9}$/.test(this.ruleForm2.phone))){ 
        alert("手机号码有误，请重填");  
        return false; 
    } else{
      return true
    }
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
.login {
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
