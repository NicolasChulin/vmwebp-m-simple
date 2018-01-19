<template lang="html">
  <div class="layout-loading" v-if="show">
    <div class="loading-back" :class="{'bounceIn': show}">
      <img src="/static/images/layout-loading.gif" alt="loading">
    </div>
  </div>
</template>

<script>
export default {
  name: 'layout-loading',
  props: {
    show: false
  }
}
</script>

<style lang="css" scoped>
.loading-back{
  position: fixed;
  width: 80px;
  height: 80px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 5px;
  overflow: hidden;
  left: 50%;
  top: 50%;
  margin-left: -50px;
  margin-top: -50px;
  z-index: 99999;
}
.loading-back img{
  display: block;
  width: 50px;
  height: 50px;
  margin: 15px;
}

@keyframes bounceIn {
  from, 20%, 40%, 60%, 80%, to {
    animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
  }

  0% {
    opacity: 0;
    transform: scale3d(.3, .3, .3);
  }

  20% {
    transform: scale3d(1.1, 1.1, 1.1);
  }

  40% {
    transform: scale3d(.9, .9, .9);
  }

  60% {
    opacity: 1;
    transform: scale3d(1.03, 1.03, 1.03);
  }

  80% {
    transform: scale3d(.97, .97, .97);
  }

  to {
    opacity: 1;
    transform: scale3d(1, 1, 1);
  }
}

.bounceIn {
  animation-name: bounceIn;
  animation-duration: .5s;
}

</style>
