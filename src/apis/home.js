import api from './api'

export default {
  list (datas, success, error) {
    api._post('', datas, success, error)
  }
}
