<template lang="html">
  <div class="footer">
    <ul>
      <li v-for="m in menus" :class="{'footer-li-act':mtype==m.type}" @click="switchMenu(m)">
        <i class="iconfont" :class="m.icon"></i>
        <span>{{m.name}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'footer',
  data () {
    return {
      menus: [
        {
          type: 'Index',
          name: '首页',
          icon: 'icon-home'
        },
        {
          type: 'Designer',
          name: '设计师',
          icon: 'icon-designer'
        },
        {
          type: 'Shop',
          name: '商店',
          icon: 'icon-shopping'
        },
        {
          type: 'Cart',
          name: '购物车',
          icon: 'icon-cart'
        },
        {
          type: 'Account',
          name: '我',
          icon: 'icon-wo'
        }
      ]
    }
  },
  props: ['mtype'],
  methods: {
    switchMenu (item) {
      this.$router.push({name: item.type})
    }
  }
}
</script>

<style scoped>
.footer{
  height: .98rem;
  width: 100%;
  position: fixed;
  z-index: 999;
  bottom: 0;
  left: 0;
  background: #fff;
  box-shadow:  0 0 1px #808080;
}

li{
  width: 20%;
  float: left;
  height: 100%;
  text-align: center;
  color: #666;
}
.iconfont{
  display: block;
  font-size: .4rem;
  height: .6rem;
  line-height: .6rem;
}
span{
  display: block;
  font-size: .22rem;
}
li.footer-li-act{
  color:#ec9182;
}
</style>
