<template lang="html">
  <div class="layout-container" v-if="show">
    <div class="layout-content">
      <div class="layout-main" :class="{'zoomIn': show}">
        <div class="layout-title" v-if="titleShow">
          信息确认
        </div>
        <div class="layout-msg">
          {{msg}}
        </div>
        <div class="layout-btns">
          <span @click="confirm">{{btnConfirmName}}</span>
          <span class="btn-bold" @click="cancel">{{btnCancelName}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      show: false,
      titleShow: false,
      msg: '',
      btnConfirmName: '确认',
      btnCancelName: '取消',
      confirmAction: '',
      cancelAction: ''
    }
  },
  methods: {
    confirm () {
      let that = this
      if (typeof that.confirmAction === 'function') that.confirmAction()
      this.show = false
    },
    cancel () {
      let that = this
      if (typeof that.cancelAction === 'function') that.cancelAction()
      this.show = false
    }
  }
}
</script>

<style lang="css" scoped>
.layout-container{
  position: fixed;
  width: 100%;
  height: 100%;
  top:0;
  left: 0;
  z-index: 99999;
  background: rgba(0, 0, 0, 0.5);
}
.layout-content{
  position: absolute;
  width: 300px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  overflow: hidden;
  text-align: center;
  border-radius: 5px;
}
.layout-main{
  background: #fff;
  box-shadow: 0 0 5px #808080;
  border-radius: 5px;
}
.layout-msg{
  padding: 20px;
  color: #333;
}
.layout-title{
  height: 40px;
  line-height: 40px;
  overflow: hidden;
  border-bottom: 1px solid #e0e0e0;
}
.layout-btns{
  height: 50px;
  padding: 10px 0;
  border-top: 1px solid #e0e0e0;
}
.layout-btns span{
  display: block;
  float: left;
  width: 50%;
  line-height: 30px;
  border-right: 1px solid #e0e0e0;
  cursor: pointer;
}
.layout-btns span.btn-bold{
  font-weight: bold;
}
.layout-btns span:last-child{
  border: 0;
}

@keyframes zoomIn {
  from {
    opacity: 0;
    transform: scale3d(.3, .3, .3);
  }

  50% {
    opacity: 1;
  }
}

.zoomIn {
  animation-name: zoomIn;
  animation-duration: .3s;
}
</style>
