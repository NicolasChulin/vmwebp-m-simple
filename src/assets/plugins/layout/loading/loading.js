import loadingComponent from '@/assets/plugins/layout/loading/loading.vue'

let $vm

export default {
  install (Vue, options) {
    if (!$vm) {
      const LoadingPlugin = Vue.extend(loadingComponent)

      $vm = new LoadingPlugin({
        el: document.createElement('div')
      })
      document.body.appendChild($vm.$el)
    }
    $vm.show = false
    let loading = {
      isShow: $vm.show,
      show () {
        $vm.show = loading.isShow = true
      },
      hide () {
        $vm.show = loading.isShow = false
      }
    }

    if (!Vue.$loading) {
      Vue.$loading = loading
    }

    Vue.mixin({
      created () {
        this.$loading = Vue.$loading
      }
    })
  }
}
