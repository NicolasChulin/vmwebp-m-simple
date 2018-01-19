<template lang="html">
  <div class="index">
    <view-header htitle="首页"></view-header>
    <div class="view-content">
      <h1>{{ msg }}</h1>
      <br>
      <!-- <router-link to="/name">Go to name</router-link> -->
      <div class="msg" @click="say">
        点我谈一个消息
      </div>
    </div>
    <view-footer mtype="Index"></view-footer>
  </div>
</template>

<script>
import viewFooter from '@/components/common/Footer'
import viewHeader from '@/components/common/Header'

export default {
  name: 'index',
  data () {
    return {
      msg: 'buoumall'
    }
  },
  created () {
    // this.$http.post('/v2/dynamic/list').then((rep) => {
    //   console.log(rep.data)
    // })
    this.$ls.set('sto', 'new')
  },
  components: {
    viewFooter,
    viewHeader
  },
  methods: {
    say () {
      // console.log(this)
      this.layer.msg('1111')
    }
  }
}
</script>

<style>
</style>
