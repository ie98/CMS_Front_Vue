<template>
  <div>
    <div class="register-wrapper">
      <div id="register">
        <p class="title">登录</p>
        <el-form
          ref="loginFromRef"
          :model="loginFrom"
          status-icon
          label-width="0"
          class="demo-ruleForm"
        >
          <el-form-item prop="out_trade_no">
            <el-input
              v-model="loginFrom.out_trade_no"
              placeholder="请输如ID"
            ></el-input>
          </el-form-item>
          <el-form-item prop="subject">
            <el-input
             
              v-model="loginFrom.subject"
              placeholder="名称"
            ></el-input>
          </el-form-item>
           <el-form-item prop="total_amount">
            <el-input
              v-model="loginFrom.total_amount"
              placeholder="金额"
            ></el-input>
          </el-form-item>
           <el-form-item prop="body">
            <el-input
              v-model="loginFrom.body"
              placeholder="描述"
            ></el-input>
          </el-form-item>
           <el-form-item prop="timeout_express">
            <el-input       
              v-model="loginFrom.timeout_express"
              placeholder="等待时间"
            ></el-input>
          </el-form-item>
           <el-form-item prop="product_code">
            <el-input
              v-model="loginFrom.product_code"
              placeholder="商品码"
            ></el-input>
          </el-form-item>
         
          <el-form-item>
            <el-button type="primary" @click="submit" style="width:100%;"
              >提交</el-button
            >
          
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
        out_trade_no: '',
        subject: '',
        total_amount: '',
        body: '',
        timeout_express: '',
        product_code: ''
      }
    }
  },
  methods: {
    async submit(){
        const { data: res } = await this.$http.post(`/pay`, this.loginFrom)
        console.log(res)
        let divForm = document.getElementsByTagName('divform')
            if (divForm.length) {
              document.body.removeChild(divForm[0])
            }
            const div = document.createElement('divform')
            div.innerHTML = res // res.data就是sb支付宝返回给你的form
            document.body.appendChild(div)
            // document.forms[0].setAttribute('target', '_blank') // 加了_blank可能出问题所以我注释了
            document.getElementsByName('punchout_form')[0].submit()
            
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
