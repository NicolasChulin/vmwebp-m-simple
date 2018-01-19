<template>
  <div class="swiper-free-scroll swiper-box">
    <swiper class="swiper-scroll" :options="swiperOption" :not-next-tick="notNextTick" ref="swiperFreeScroll">
      <swiper-slide>
        <slot></slot>
      </swiper-slide>
      <div class="swiper-scrollbar" slot="scrollbar"></div>
    </swiper>
  </div>
</template>

<script>
export default {
  name: 'swiper-free-scroll',
  data () {
    return {
      notNextTick: true,
      swiperOption: {
        scrollbar: '.swiper-scrollbar',
        direction: 'vertical',
        resistanceRatio: 0,
        slidesPerView: 'auto',
        mousewheelControl: true,
        freeModeMomentumBounce: false,
        freeModeMomentumVelocityRatio: 0.5,
        roundLengths: true,
        autoHeight: true,
        observer: true,
        observeParents: true,
        freeMode: true
      }
    }
  },
  mounted () {
    this.$refs.swiperFreeScroll.swiper.on('touchStart', (swiper) => {
      swiper.update()
    })
  }
}
</script>
