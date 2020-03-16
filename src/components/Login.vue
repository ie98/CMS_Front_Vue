<template>
  <div class="case">
    <div class="box">
      <div class="avatar_box">
        <img src="../assets/imgs/logo.png" />
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="less" scoped>
.case {
  background-color: lightblue;
  height: 100%;
}
.box {
  height: 300px;
  width: 450px;
  background-color: lightcyan;
  position: absolute;
  border-radius: 3px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.avatar_box{
  height: 50px;
  width: 50px;
  border-radius: 50px;
}
</style>
