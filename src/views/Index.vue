<template lang="html">
  <div class="index">
    <view-header></view-header>
    <div class="view-content">
      <h1>{{ msg }}</h1>
      <br>
      <div class="msg" @click="say">
        点我谈一个消息
      </div>
    </div>
    <view-footer></view-footer>
  </div>
</template>

<script>
import ViewHeader from '@/components/common/ViewHeader'
import ViewFooter from '@/components/common/ViewFooter'
import homeApi from '@/apis/home'

export default {
  name: 'index',
  data () {
    return {
      msg: 'hello world'
    }
  },
  components: {
    ViewFooter,
    ViewHeader
  },
  methods: {
    say () {
      // this.$layout.confirm({
      //   content: '这是一个确认框',
      //   confirmName: '确定',
      //   cancelName: '取消',
      //   confirmed () {
      //     console.log('confirm')
      //   }
      // })
      // this.$layout.msg('hh')
      homeApi.banners({
        count: 5,
        site: 4
      }).then((data) => {
        console.log(data)
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>

<style>
</style>
