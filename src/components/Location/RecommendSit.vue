<template>
  <div>
    <h1>recommendSit</h1>
    <div>
      <el-button
        type="success confirm"
        @click="selectConfirm"
        v-if="showConfirm == true"
        >确定</el-button
      >
    </div>
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
          <el-form-item label="people" :label-width="formLabelWidth" >
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
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogFormVisible: false,
      form: {
        peopleNumber: 1,
        token: window.sessionStorage.getItem('token'),
        region: '',
        allPeopleName: []
      },
       showConfirm: false,
        formLabelWidth: '120px'
    }
  },
  created() {
    this.showDialogForm()
  },
  methods: {
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
    async recommendSit() {
      console.log(this.form.peopleNumber)
      // this.dialogFormVisible = false

      if (this.form.peopleNumber > 12) {
        this.$message('人数上限为12')
        return
      } else {
        const { data: res } = await this.$http.post('/recommendSit', this.form)
        console.log(res)
        console.log(this.form.peopleNumber)
        if (res.meta.status === 10005) {
          console.log(res)
          alert(res.meta.message)
          this.showConfirm = false
          console.log('error')
        } else {
          this.tableArry = res.tables
          console.log(res)
          this.showConfirm = true
          console.log('alert-success')
        }
        this.dialogFormVisible = false
        this.$emit('getTables',{tables:res.tables,form:this.form})
      //   setTimeout(() => {
      //     if(this.form.region == 'diningtable_1'){
      //         this.$router.push('/Left')
      //     }else
      //      this.$router.push('/Right')
      // }, 300); 
      
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
      }
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
    }
  }
}
import '../../assets/css/home.css'
</script>
<style scoped></style>
