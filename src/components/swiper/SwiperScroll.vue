<template>
  <div class="scroll-swiper swiper-box">
    <swiper class="swiper-scroll" :options="swiperOption" :not-next-tick="notNextTick" ref="swiperScroll">
      <swiper-slide class="text">
        <!-- <div class="pull-down-loading" v-show="loadingDown"><span></span></div> -->

        <slot></slot>

        <div class="pull-up-loading" v-show="loadingUp"><span></span></div>
      </swiper-slide>
      <div class="swiper-scrollbar" slot="scrollbar"></div>
    </swiper>
  </div>
</template>

<script>
/*
取消下拉刷新上拉加载效果后，组件继续保留了refresh方法，
兼容已经注册refresh方法的组件，同时为后续扩展开放入口。
下拉刷新上拉加载可参看SwiperScrollPullPush组件
*/
export default {
  name: 'scroll-swiper',
  props: ['refresh', 'fetch'],
  data () {
    return {
      loadingDown: false,
      loadingUp: false,
      orient: 0,
      isTop: false,
      isBottom: false,
      translate: 0,
      noMore: false,
      isLoading: false,

      notNextTick: true,
      swiperOption: {
        scrollbar: '.swiper-scrollbar',
        direction: 'vertical',
        slidesPerView: 'auto',
        resistanceRatio: 0,
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
    const slideBarDom = that.$el.firstChild.childNodes[3]
    that.$refs.swiperScroll.swiper.on('touchStart', (swiper) => {
      that.isTop = swiper.progress === 0
      that.isBottom = swiper.progress === 1
      that.translate = swiper.translate
      swiper.update()
    })
    that.$refs.swiperScroll.swiper.on('touchEnd', (swiper) => {
      that.orient = that.translate - swiper.translate
    })
    // progress or transitionEnd
    that.$refs.swiperScroll.swiper.on('transitionEnd', (swiper) => {
      if (swiper.progress >= 0.9 && !that.noMore && that.orient > 0 && !that.isLoading) {
        slideBarDom.style.opacity = 0
        slideBarDom.style.transitionDuration = '0s'
        that.loadingUp = true
        setTimeout(() => {
          that.fetch && that.fetch()
        }, 500)
        return false
      }
    })
  },
  methods: {
    showLoading (val) {
      let that = this
      if (that.orient > 0) {
        that.loadingUp = val
        that.isLoading = val
      } else {
        that.loadingDown = val
      }
    },
    noneMoreData () {
      this.noMore = true
    }
  }
}
</script>

<style lang="scss" scoped>
.swiper-slide{
  padding-bottom: 50px;
}
.pull-down-loading, .pull-up-loading{
  height: 50px;
  padding: 5px 0;
  margin-bottom: -50px;
  background-color: #fff;
  span{
    display: block;
    width: 63px;
    height: 40px;
    margin: 0 auto;
    background: url('/static/images/loading.gif') no-repeat;
    background-size: 100% 100%;
  }
}

</style>
