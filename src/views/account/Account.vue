<template lang="html">
  <div class="account">
    <div class="view-content-top">

      <h1>这是个人中心</h1>
    </div>
    <view-footer mtype="Account"></view-footer>
  </div>
</template>

<script>
import viewFooter from '@/components/common/Footer'

export default {
  name: 'account',
  created () {
    // console.log(this.GLOBAL.imgDomain)
  },
  components: {
    viewFooter
  }

}
</script>

<style lang="css">
</style>
