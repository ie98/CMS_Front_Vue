<template>
  <div>
    <h1>cart</h1>
    <el-dialog :before-close="handleClose" title="购物车" :visible.sync="outerVisible">
      <el-dialog
        width="30%"
        title="扫码支付"
        :visible.sync="innerVisible"
        append-to-body
        
      >
        <div align="center">
          <img
            src="../../assets/imgs/1586270584469.jpg"
            style="width:200px ; height:300px"
          />
        </div>
      </el-dialog>
      <el-table
        height="300"
        ref="multipleTable"
        :data="cart"
        tooltip-effect="dark"
        style="width: 100% ;
    font-size:10px"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="foodname" label="食品名" width="120">
        </el-table-column>
        <el-table-column label="添加日期" width="120">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column prop="num" label="数量" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="allcost" label="总价(元)" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="shopname" label="店铺名" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 20px">
        <el-button @click="toggleSelection()">取消选择</el-button>
      </div>
      <div slot="footer" class="dialog-footer">
        <div class="product-cost">总价：{{ this.allCost }}元</div>
        <el-button @click="cancel ">取 消</el-button>
        <el-button type="primary" @click="innerVisible = true">下单</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      allCost: 0,
      multipleSelection: [],
      cart: [],
      outerVisible: false,
        innerVisible: false,

    }
  },
  created() {
      this.toCart()
  },
  methods: {
      async toCart(){
        this.outerVisible = true
        const { data: res } = await this.$http.post('getCart', {id:window.sessionStorage.getItem('id')})
        
        for (let index = 0; index < res.cart.length; index++) {
            res.cart[index].allcost = (res.cart[index].price * res.cart[index].num)
            res.cart[index].date = this.timestampToTime (res.cart[index].date) 
        }
        this.cart = res.cart
        console.log(res)
      },
           timestampToTime (cjsj) {
        var date = new Date(cjsj) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '-'
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-'
        var D = date.getDate() + ' '
        var h = date.getHours() + ':'
        var m = date.getMinutes() + ':'
        var s = date.getSeconds()
        return Y+M+D+h+m+s
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
    handleSelectionChange(val) {
      this.multipleSelection = val
      this.allCost = 0
      for (let index = 0; index < val.length; index++) {
        this.allCost += val[index].allcost
      }
    },
    handleEdit(index, row) {
      console.log(index, row)
    },
    handleDelete(index, row) {
      console.log('11111111')
      console.log(index, row)
      console.log('22222222')
    },
    cancel(){
      this.outerVisible = false
     
        this.$router.push('/allFood')
   
    },
    handleClose(done) {
     
        this.$router.push('/allFood')
     
      }
  }
}
</script>
<style scoped></style>
