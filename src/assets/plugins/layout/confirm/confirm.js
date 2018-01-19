import confirmComponent from '@/assets/plugins/layout/confirm/confirm.vue'

let $vm

export default {
  install (Vue, options) {
    if (!$vm) {
      const ComfirmPlugin = Vue.extend(confirmComponent)

      $vm = new ComfirmPlugin({
        el: document.createElement('div')
      })
      document.body.appendChild($vm.$el)
    }

    let confirm = (opts) => {
      $vm.msg = opts.content
      if (opts['confirmName']) $vm.btnConfirmName = opts.confirmName
      if (opts['cancelName']) $vm.btnCancelName = opts.cancelName
      if (opts['confirmed']) $vm.confirmAction = opts.confirmed
      if (opts['canceled']) $vm.cancelAction = opts.canceled
      $vm.titleShow = (opts['titleShow'])
      $vm.show = true
    }

    if (!Vue.$confirm) {
      Vue.$confirm = confirm
    }

    Vue.mixin({
      created () {
        this.$confirm = Vue.$confirm
      }
    })
  }
}
