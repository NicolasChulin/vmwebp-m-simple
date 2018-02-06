import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'

const errorCallback = function (error) {
  Vue.$layout.loadingHide()

  if (error.response) {
    Vue.$layout.msg(error.response.data.msg || '网络错误，请稍后再试')
  } else if (error.request) {
    console.log(error.request)
  } else {
    console.log('Error')
  }
}

// get
const _get = (url, datas) => {
  let sqDatas = ''
  if (datas) {
    sqDatas = qs.stringify(datas)
    url += '?' + sqDatas
  }
  return axios.get(url).then((rep) => {
    return rep.data
  }).catch((error) => {
    errorCallback(error)
    return error.response.data
  })
}

// post
const _post = (url, datas) => {
  let sqDatas = ''
  if (datas) {
    sqDatas = qs.stringify(datas)
  }

  return axios.post(url, sqDatas).then((rep) => {
    return rep.data
    // 依据不同请求数据情况，给出不同公共处理逻辑，下面给出一个示例：
    // if (rep.data.code === 200) {
    //   return rep.data
    // } else {
    //   Vue.$layout.msg(rep.data.msg || '数据错误！')
    // }
  }).catch((error) => {
    errorCallback(error)
    return error.response.data
  })
}

// delete
const _delete = (url, datas) => {
  let sqDatas = ''
  if (datas) {
    sqDatas = qs.stringify(datas)
    url += '?' + sqDatas
  }
  return axios.delete(url).then((rep) => {
    return rep.data
  }).catch((error) => {
    errorCallback(error)
    return error.response.data
  })
}

// put
const _put = (url, datas) => {
  let sqDatas = ''
  if (datas) {
    sqDatas = qs.stringify(datas)
  }

  return axios.put(url, sqDatas).then((rep) => {
    return rep.data
  }).catch((error) => {
    errorCallback(error)
    return error.response.data
  })
}

// patch
const _patch = (url, datas) => {
  let sqDatas = ''
  if (datas) {
    sqDatas = qs.stringify(datas)
  }

  return axios.patch(url, sqDatas).then((rep) => {
    return rep.data
  }).catch((error) => {
    errorCallback(error)
    return error.response.data
  })
}

export default {
  _get,
  _post,
  _delete,
  _put,
  _patch
}
