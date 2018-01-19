import Vue from 'vue'
import axios from 'axios'
import layout from '@/assets/plugins/layout/layout'
import qs from 'qs'

Vue.use(layout)

const errorCallback = function (error) {
  Vue.$layout.loadingHide()
  if (error.response) {
    Vue.$layout.msg('网络错误，请稍后再试')
  }
  // if (error.response) {
  //   console.log(error.response)
  //   Vue.$layout.msg('网络错误，请稍后再试')
  // } else if (error.request) {
  //   console.log(error.request)
  // } else {
  //   console.log('Error')
  // }
}

const _get = (url, success, error = errorCallback) => {
  axios.get(url).then(success).catch(error)
}
const _post = (url, datas, success, error = errorCallback) => {
  let sqDatas = qs.stringify(datas)
  axios.post(url, sqDatas).then(success).catch(error)
}
const _delete = (url, datas, success, error = errorCallback) => {
  axios.delete(url, datas).then(success).catch(error)
}
const _put = (url, datas, success, error = errorCallback) => {
  axios.put(url, datas).then(success).catch(error)
}
const _patch = (url, datas, success, error = errorCallback) => {
  axios.patch(url, datas).then(success).catch(error)
}

export default {
  _get,
  _post,
  _delete,
  _put,
  _patch
}
