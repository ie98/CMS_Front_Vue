<template>
<div>
     <div v-for="items in allFood" :key="items.id">
              <el-row>
                <div v-for="item in items" :key="item.id">
                <el-col :span="4">
                  <!-- <router-link :to="'/product/' + info.id" class="product-main"  > -->
                  <div class="product-main">
                    <h4>{{item.shopname}}</h4>
                    <img
                      :src="
                        require('D:/vueProject/vue_proj_01/src/assets/imgs/' +
                          item.img)
                      "
                      style="height: 100px; width: 80%;"
                    />
                    <h4>{{ item.foodname }}</h4>

                    <div>
                      <el-input-number
                        v-model="item.num"
                        :min="0"
                        :max="10"
                        size="small"
                        label="描述文字"
                      ></el-input-number>
                    </div>
                    <div class="product-cost">¥ {{ item.price }}</div>
                     <el-button type="primary" size="mini" @click="addcart(item)">加入购物车</el-button>
                    <!-- <div class="product-add-cart" @click.prevent="handleCart">加入购物车</div> -->
                    <!-- </router-link> -->
                  </div>
                </el-col>
                </div>
              </el-row>
              </div>
              </div>
</template>
<script>
export default {
    data() {
        return {
              allFood: [],
        }
    },
    created(){
      console.log("allFood")
        this.toSelectFood()
    },
    methods:{
          async toSelectFood() {
      this.allFood = []
      const { data: res } = await this.$http.get('selectAllFood', {})
      var temp = []
      for (let index = 0; index < res.length; index++) {
        res[index].num = 0
        temp.push(res[index])
        if ((index + 1) % 6 == 0) {
          this.allFood.push(temp)
          temp = []
        }
      
      }
      this.allFood.push(temp)
          temp = []
      console.log(this.allFood)
      this.$emit('allFood',this.allFood)
    },
        async addcart(item){
        if(item.num == 0){
          alert("食品数量不能为0")
        }
        const { data: res } = await this.$http.post('addCart', {cart: item , id:window.sessionStorage.getItem('id')})
    },
    }
}
</script>
<style scoped>

</style>