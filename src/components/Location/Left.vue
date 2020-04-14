<template>
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
</template>
<script>
export default {
    data() {
        return {
            tableArry: [],
        }
    },
    created(){
        this.toSitOne()
    },
    methods: {
            async toSitOne() {
//       this.show.sit = true
// this.show.food  = false
      const { data: res } = await this.$http.get('/inLeft')
      // this.info.image = require('D:/vueProject/vue_proj_01/src/assets/imgs/asd.jpg')
      this.tableArry = res
      this.showConfirm = false
      console.log('One')
      console.log(this.tableArry)
    },
    },
}
</script>