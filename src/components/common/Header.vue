<template lang="html">
  <div class="header">
    <i class="iconfont icon-back" @click="back"></i>
    <h1 @click="say">{{htitle}}</h1>
  </div>
</template>

<script>
export default {
  name: 'header',
  props: ['htitle'],
  methods: {
    back () {
      this.$router.go(-1)
    },
    say () {
      this.layer.msg('h1', {time: 500})
    }
  }
}
</script>

<style lang="css" scoped>
.header{
  height: .8rem;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  background: #fff;
  color: #333;
  text-align: center;
  box-shadow: 0 0 1px #808080;
}
.header h1{
  padding:0 .68rem;
  line-height: .8rem;
  font-size: .28rem;
}
.iconfont{
  display: block;
  float: left;
  width: .68rem;
  height:.8rem;
  line-height: .8rem;
  font-size: .4rem;
}
</style>
