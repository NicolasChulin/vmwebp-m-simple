import Vue from 'vue'
import axios from 'axios'
import layout from '@/assets/plugins/layout/layout'
import qs from 'qs'

Vue.use(layout)

const errorCallback = function (error) {
  Vue.$layout.loadingHide()
  if (error.response) {
    Vue.$layout.msg(error.response.data.msg || '网络错误，请稍后再试')
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

// const _post = (url, datas, success, error = errorCallback) => {
//   let sqDatas = qs.stringify(datas)
//   axios.post(url, sqDatas).then(success).catch(error)
// }

// get
const _get = (url, datas) => {
  let sqDatas = ''
  if (datas) {
    sqDatas = qs.stringify(datas)
    url += '?' + sqDatas
  }
  return new Promise((resolve, reject) => {
    axios.get(url).then((rep) => {
      resolve(rep.data)
    }).catch((error) => {
      errorCallback(error)
      reject(error.response.data)
    })
  })
}
// post
const _post = (url, datas) => {
  let sqDatas = ''
  if (datas) {
    sqDatas = qs.stringify(datas)
  }

  return new Promise((resolve, reject) => {
    axios.post(url, sqDatas).then((rep) => {
      resolve(rep.data)
      // 依据不同请求数据情况，给出不同公共处理逻辑，下面给出一个示例：
      // if (rep.data.code === 200) {
      //   resolve(rep.data)
      // } else {
      //   Vue.$layout.msg(rep.data.msg || '数据错误！')
      // }
    }).catch((error) => {
      errorCallback(error)
      reject(error.response.data)
    })
  })
}
// delete
const _delete = (url, datas) => {
  let sqDatas = ''
  if (datas) {
    sqDatas = qs.stringify(datas)
    url += '?' + sqDatas
  }
  return new Promise((resolve, reject) => {
    axios.delete(url).then((rep) => {
      resolve(rep.data)
    }).catch((error) => {
      errorCallback(error)
      reject(error.response.data)
    })
  })
}
// put
const _put = (url, datas) => {
  let sqDatas = ''
  if (datas) {
    sqDatas = qs.stringify(datas)
  }

  return new Promise((resolve, reject) => {
    axios.put(url, sqDatas).then((rep) => {
      resolve(rep.data)
    }).catch((error) => {
      errorCallback(error)
      reject(error.response.data)
    })
  })
}
// patch
const _patch = (url, datas) => {
  let sqDatas = ''
  if (datas) {
    sqDatas = qs.stringify(datas)
  }

  return new Promise((resolve, reject) => {
    axios.patch(url, sqDatas).then((rep) => {
      resolve(rep.data)
    }).catch((error) => {
      errorCallback(error)
      reject(error.response.data)
    })
  })
}

export default {
  _get,
  _post,
  _delete,
  _put,
  _patch
}
