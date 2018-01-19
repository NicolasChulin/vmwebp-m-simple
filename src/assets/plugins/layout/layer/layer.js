import layerComponent from '@/assets/plugins/layout/layer/layer.vue'

let $vm

export default {
  install (Vue, options) {
    if (!$vm) {
      const LayerPlugin = Vue.extend(layerComponent)

      $vm = new LayerPlugin({
        el: document.createElement('div')
      })
      document.body.appendChild($vm.$el)
    }
    $vm.show = false
    $vm.msg = ''
    $vm.t = ''
    let layer = {
      isShow: $vm.show,
      msg (text, duringTime = 1500) {
        layer.hide()
        setTimeout(() => {
          $vm.show = layer.isShow = true
          $vm.msg = text
          $vm.t = setTimeout(() => {
            layer.hide()
          }, parseInt(duringTime))
        }, 100)
      },
      hide () {
        if ($vm.t) clearTimeout($vm.t)
        $vm.show = layer.isShow = false
        $vm.msg = ''
      }
    }

    if (!Vue.$layer) {
      Vue.$layer = layer
    }

    Vue.mixin({
      created () {
        this.$layer = Vue.$layer
      }
    })
  }
}
