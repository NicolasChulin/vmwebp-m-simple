<template lang="html">
  <div class="layout-msg">
    <div class="layout-container" v-if="show">
      <div class="layout-content">
        <div class="layout-message" :class="{'bounceIn': show}">
          {{msg}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'layout-msg',
  data () {
    return {
      show: false,
      msg: {
        type: String,
        default: ''
      }
    }
  }
}
</script>

<style lang="css" scoped>
.layout-container{
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 99999;
}
.layout-content{
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  max-width: 300px;
  border-radius: 5px;
  overflow: hidden;
  z-index: 99999;
}
.layout-message{
  padding: 10px 20px;
  line-height: 22px;
  color: #fff;
  background: rgba(0, 0, 0, 0.5);
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
