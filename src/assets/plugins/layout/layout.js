/*
三个插件layer,laoding,confirm合并处理生成layout插件
也可以单独使用其中某一个，在各自的文件夹中已经写好独立插件
需要分开使用时，单独引入个人js文件使用
*/
import layerComponent from './layer/layer.vue'
import loadingComponent from './loading/loading.vue'
import confirmComponent from './confirm/confirm.vue'

let $vmLayer
let $vmLoading
let $vmConfirm

export default {
  install (Vue, options) {
    if (!$vmConfirm) {
      const ComfirmPlugin = Vue.extend(confirmComponent)
      $vmConfirm = new ComfirmPlugin({
        el: document.createElement('div')
      })
      document.body.appendChild($vmConfirm.$el)
    }
    if (!$vmLayer) {
      const LayerPlugin = Vue.extend(layerComponent)
      $vmLayer = new LayerPlugin({
        el: document.createElement('div')
      })
      document.body.appendChild($vmLayer.$el)
    }
    if (!$vmLoading) {
      const LoadingPlugin = Vue.extend(loadingComponent)
      $vmLoading = new LoadingPlugin({
        el: document.createElement('div')
      })
      document.body.appendChild($vmLoading.$el)
    }

    $vmLayer.t = ''
    let layout = {
      isMsgShow: $vmLayer.show,
      msg (text, duringTime = 1500) {
        layout.msgHide()
        setTimeout(() => {
          $vmLayer.show = layout.isMsgShow = true
          $vmLayer.msg = text
          $vmLayer.t = setTimeout(() => {
            layout.msgHide()
          }, parseInt(duringTime))
        }, 100)
      },
      msgHide () {
        if ($vmLayer.t) clearTimeout($vmLayer.t)
        $vmLayer.show = layout.isMsgShow = false
        $vmLayer.msg = ''
      },
      isLoadingShow: $vmLoading.show,
      loading () {
        $vmLoading.show = true
        layout.isLoadingShow = true
      },
      loadingHide () {
        $vmLoading.show = false
        layout.isLoadingShow = false
      },
      confirm (opts) {
        $vmConfirm.msg = opts.content
        $vmConfirm.titleShow = (opts['titleShow'])
        if (opts['confirmName']) $vmConfirm.btnConfirmName = opts.confirmName
        if (opts['cancelName']) $vmConfirm.btnCancelName = opts.cancelName
        if (opts['confirmed']) $vmConfirm.confirmAction = opts.confirmed
        if (opts['canceled']) $vmConfirm.cancelAction = opts.canceled
        $vmConfirm.show = true
      }
    }

    if (!Vue.$layout) {
      Vue.$layout = layout
    }

    Vue.mixin({
      created () {
        this.$layout = Vue.$layout
      }
    })
  }
}
