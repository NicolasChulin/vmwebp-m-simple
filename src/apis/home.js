import api from './api'

export default {
  look (datas) {
    return api._post('/look/list', datas)
  },
  banners (datas) {
    return api._post('/banner/v1/lists', datas)
  }
}
