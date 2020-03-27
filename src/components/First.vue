<template>
  <el-button type="primary" @click="toFirst"> To First </el-button>
</template>
<script>
export default {
  methods: {
    async toFirst() {
      var data = await this.$http.post('/ct/first', {});
      console.log(data)
    }
  }
}
</script>
<style lang="less" scoped></style>
