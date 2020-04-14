<template>
<div>


<el-dialog
:before-close="handleClose"
  title="推荐食品"
  :visible.sync="showRecommendFoodForm"
  width="30%"
>
    <div class="product-main">
                    <h4>{{recommendFood.shopname}}</h4>
                    <img v-if="recommendFood.img != null" 
                      :src="
                        require('D:/vueProject/vue_proj_01/src/assets/imgs/' + recommendFood.img)
                      "
                      style="height: 200px; width: 300px;"
                    />
                    <h4>{{ recommendFood.foodname }}</h4>

                    <div>
                      <el-input-number
                        v-model="recommendFood.num"
                        :min="0"
                        :max="10"
                        size="small"
                        label="描述文字"
                      ></el-input-number>
                    </div>
                    <div class="product-cost">¥ {{ recommendFood.price }}</div>
                     <el-button type="primary" size="mini" @click="addcart(recommendFood)">加入购物车</el-button>
                    <!-- <div class="product-add-cart" @click.prevent="handleCart">加入购物车</div> -->
                    <!-- </router-link> -->
                  </div>
  <span slot="footer" class="dialog-footer">
    <el-button @click="cancelAddCar">取 消</el-button>
    <!-- <el-button type="primary" @click="recommendConfirm()">确 定</el-button> -->
  </span>
</el-dialog>
     
</div>
   
</template>
<script>
export default {
     data() {
        return {
            allFood:[],
            recommendFood:{},
            showRecommendFoodForm:false
        }
    },
    created(){
        this.showRecommendFood()
    },
    methods:{
        
       async showRecommendFood(){
       if(this.allFood .length == 0){
          //  console.log("allFood==Null")
          const { data: res } = await this.$http.get('selectAllFood', {})
           console.log(res)
          this.recommendFood = res[Math.floor(Math.random()*res.length)]
          console.log(this.recommendFood)
        }else
        {
          console.log(this.allFood)
            const num = Math.floor(Math.random()* ((this.allFood.length-1)*6+this.allFood[this.allFood.length-1].length))
            console.log(num)
            const row = Math.floor(num/6)
            const col = (num%6)
            console.log(row + "  " +col)
            this.recommendFood = this.allFood[row][col]
             console.log(this.recommendFood)
        }
       this.showRecommendFoodForm = true
  
      },
        async addcart(item){
        if(item.num == 0){
          alert("食品数量不能为0")
        }
        const { data: res } = await this.$http.post('addCart', {cart: item , id:window.sessionStorage.getItem('id')})
        this.showRecommendFoodForm = false
       
        this.$router.push('/allFood')
      
    },
     
    cancelAddCar(){
      console.log("cancelAddCar")
      this.showRecommendFoodForm = false
      
        this.$router.push('/allFood')
    
      
    },
     handleClose(done) {
      
        this.$router.push('/allFood')
      
      }
    }
}
</script>
<style scoped>

</style>