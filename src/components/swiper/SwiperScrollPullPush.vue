<!-- 上拉加载下拉刷新 -->
<template>
  <div class="swiper-scroll-pull-push swiper-box">
    <swiper class="swiper-scroll" :options="swiperOption" :not-next-tick="notNextTick" ref="swiperScrollPullPush">
      <swiper-slide class="text">
        <div class="pull-down-tips"></div>
        <div class="pull-down-loading" v-show="loadingDown"><span></span></div>

        <slot></slot>

        <div class="pull-up-loading" v-show="loadingUp"><span></span></div>
        <div class="pull-up-tips" v-show="showUpTips"></div>

        <!-- <div class="pull-bottomed" v-if="noMore">我是有底线的</div> -->
      </swiper-slide>
      <div class="swiper-scrollbar" slot="scrollbar"></div>
    </swiper>
  </div>
</template>

<script>
export default {
  name: 'swiper-scroll-pull-push',
  props: ['refresh', 'fetch'],
  data () {
    return {
      pullDownEnough: false,
      pullUpEnough: false,
      showUpTips: false,
      loadingDown: false,
      loadingUp: false,
      isTop: false,
      isBottom: false,
      translate: 0,
      noMore: false,
      isPullDown: false,

      notNextTick: true,
      swiperOption: {
        scrollbar: '.swiper-scrollbar',
        direction: 'vertical',
        slidesPerView: 'auto',
        mousewheelControl: true,
        passiveListeners: false,
        roundLengths: true,
        observer: true,
        observeParents: true,
        freeMode: true
      }
    }
  },
  mounted () {
    const that = this
    const slideDom = that.$el.firstChild.childNodes[1].firstChild
    const downTipsDom = slideDom.firstChild
    const upTipsDom = slideDom.lastChild
    that.$refs.swiperScrollPullPush.swiper.on('touchStart', (swiper) => {
      that.isTop = swiper.progress === 0
      that.isBottom = swiper.progress === 1
      that.translate = swiper.translate
    })
    that.$refs.swiperScrollPullPush.swiper.on('touchMove', (swiper) => {
      let orient = that.translate - swiper.translate
      let pullLengh = Math.abs(orient)
      if (that.refresh && that.isTop && orient < 0) {
        if (pullLengh >= 20 && pullLengh < 50) {
          downTipsDom.innerHTML = '下拉可以刷新'
          that.pullDownEnough = false
        } else if (pullLengh >= 50) {
          downTipsDom.innerHTML = '松开立即刷新'
          that.pullDownEnough = true
        }
      }
      if (that.fetch && !that.noMore && that.isBottom && orient > 0) {
        that.showUpTips = true
        if (pullLengh >= 20 && pullLengh < 50) {
          upTipsDom.innerHTML = '上拉加载更多'
          that.pullUpEnough = false
        } else if (pullLengh >= 50) {
          upTipsDom.innerHTML = '释放加载更多'
          that.pullUpEnough = true
        }
      }
    })
    that.$refs.swiperScrollPullPush.swiper.on('touchEnd', (swiper) => {
      swiper.update()
      that.isPullDown = that.translate < swiper.translate
      if (that.pullDownEnough) {
        that.pullDownEnough = false
        downTipsDom.innerHTML = ''
        if (that.refresh) {
          that.refresh()
        }
      }
      that.showUpTips = false
      if (that.pullUpEnough) {
        that.pullUpEnough = false
        upTipsDom.innerHTML = ''
        if (that.fetch) {
          that.fetch()
        }
      }
      return false
    })
  },
  methods: {
    showLoading (val) {
      if (this.isPullDown) {
        this.loadingDown = val
      } else {
        this.loadingUp = val
      }
    },
    noneMoreData () {
      this.noMore = true
    }
  }
}
</script>

<style lang="scss">
.swiper-scroll{
  height: 100%;

  > .swiper-wrapper > .swiper-slide{
    height: auto !important;
  }
}
.pull-down-tips{
  position: absolute;
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  top: -50px;
  left: 0;
  z-index: 99;
}
.pull-up-tips{
  position: absolute;
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  bottom: -50px;
  left: 0;
  z-index: 99;
}
.pull-down-loading, .pull-up-loading{
  height: 50px;
  padding: 5px 0;
  span{
    display: block;
    width: 63px;
    height: 40px;
    margin: 0 auto;
    background: url(/static/images/loading.gif) no-repeat;
    background-size: 100% 100%;
  }
}
.pull-bottomed{
  height: 1rem;
  line-height: 1rem;
  text-align: center;
  font-size: .28rem;
}
</style>
