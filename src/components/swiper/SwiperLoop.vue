<template>
  <div class="swiper-loop">
    <swiper :options="swiperOption" :not-next-tick="notNextTick" ref="swiperLoop">
      <swiper-slide v-for="slide in swiperSlides" :key="slide.id">
        <img :data-src="slide.imgsrc" class="swiper-lazy">
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
export default {
  name: 'swiper-loop',
  props: ['slides', 'topage'],
  data () {
    return {
      notNextTick: true,
      swiperOption: {
        loop: true,
        autoplay: 5000,
        autoplayDisableOnInteraction: false,
        setWrapperSize: true,
        pagination: '.swiper-pagination',
        lazyLoading: true,
        lazyLoadingInPrevNext: true,
        lazyLoadingOnTransitionStart: true,
        observeParents: true,
        slidesPerView: 1
      },
      swiperSlides: this.slides
    }
  },
  mounted () {
    this.$refs.swiperLoop.swiper.on('click', (swiper) => {
      let index = swiper.realIndex
      let item = this.slides[index]
      this.topage(item)
    })
  }
}
</script>

<style lang="scss" scoped>
.swiper-slide{
  height: 3.4rem;
  overflow: hidden;
  img{
    display: block;
    width: 100%;
    height: auto;
  }
}
</style>
