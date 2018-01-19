import GLOBAL from '@/config'
import Vue from 'vue'
import router from '@/router'

let Util = {
  getResizeImgUrl (addr, size, type = 'auto') {
    if (!addr) return addr
    let address = addr
    let domain = addr.indexOf('http:') === -1 ? GLOBAL.imgDomain + '/' : ''
    let pos = addr.indexOf('?')
    if (pos > -1) {
      address = addr.slice(0, pos)
    }
    if (!address) return addr

    let sizeType = {
      'lg': 1000,
      'md': 750,
      'sm': 600,
      'xs': 414,
      'avatar': 100
    }
    let s
    if (typeof size === 'string') {
      s = sizeType[size] ? sizeType[size] : 750
    } else if (typeof size === 'number') {
      s = size
    } else {
      s = 750
    }
    if (type === 'auto') {
      return domain + address + '?x-oss-process=image/resize,w_' + s
    } else if (type === 'square') {
      return domain + address + '?x-oss-process=image/resize,m_fill,w_' + s + ',h_' + s
    } else {
      return addr
    }
  },
  numToFixed (num, point = 2) {
    return parseFloat(num).toFixed(point)
  },
  addZero (num) {
    if (num > 9) return num
    return '0' + num
  },
  modyContentImg (str) {
    if (!str) return str
    let newStr = ''
    let remainStr = ''
    while (str.indexOf('<img') > -1) {
      let pos = str.indexOf('<img')
      newStr += str.slice(0, pos)
      remainStr = str.slice(pos)

      pos = remainStr.indexOf(' src=')
      newStr += remainStr.slice(0, pos)
      remainStr = remainStr.slice(pos + 6)

      pos = remainStr.indexOf('"')
      let imgUrl = remainStr.slice(0, pos)
      // newStr += ' v-lazy.container="' + Util.getResizeImgUrl(imgUrl, 'md') + '"'
      newStr += ' src="' + Util.getResizeImgUrl(imgUrl, 'md') + '"'
      str = remainStr.slice(pos + 2)
    }
    newStr += str
    return newStr
  },
  timeFomate (time, type = 'H') {
    if (!time) return
    let tim = parseInt(time)
    tim = new Date(tim)
    let dstr = tim.getFullYear() + '-' + Util.addZero(tim.getMonth() + 1) + '-' + Util.addZero(tim.getDate())

    if (type === 'd') {
      return dstr
    } else if (type === 'H') {
      // YYYY-mm-dd HH:ii
      dstr += ' ' + Util.addZero(tim.getHours()) + ':' + Util.addZero(tim.getMinutes())
      return dstr
    } else if (type === 's') {
      dstr += ' ' + Util.addZero(tim.getHours()) + ':' + Util.addZero(tim.getMinutes()) + ':' + Util.addZero(tim.getSeconds())
      return dstr
    }
  },
  getDiscountStatus (start, end) {
    let nowt = new Date().getTime()
    if (nowt < start) {
      return '未开始'
    } else if (nowt >= start && nowt < end) {
      return '已开始'
    } else {
      return '已结束'
    }
  },
  deepCopy (source) {
    var sourceCopy = source instanceof Array ? [] : {}
    for (var item in source) {
      sourceCopy[item] = typeof source[item] === 'object' ? Util.deepCopy(source[item]) : source[item]
    }
    return sourceCopy
  },
  formatSize (size) {
    if (size > 1024 * 1024 * 1024) {
      let num = (size / 1024 / 1024 / 1024).toFixed(2)
      return {
        size: num + 'GB',
        num: num,
        unit: 'GB'
      }
    } else if (size > 1024 * 1024) {
      let num = (size / 1024 / 1024).toFixed(2)
      return {
        size: num + 'MB',
        num: num,
        unit: 'MB'
      }
    } else if (size > 1024) {
      let num = (size / 1024).toFixed(2)
      return {
        size: num + 'KB',
        num: num,
        unit: 'KB'
      }
    }
    return {
      size: size.toString() + 'B',
      num: size.toString(),
      unit: 'B'
    }
  },
  duration (time) {
    time = parseFloat(time)
    let minute = Util.addZero(Math.floor(time / 60))
    let second = Util.addZero(Math.floor(time - minute * 60))
    return minute + '′' + second + '″'
  },
  download (opt, success) {
    if (!opt.bomFrontUt) {
      Vue.$layout.msg('会话已过期，请重新登录！')
      router.push({name: 'Login'})
      return
    }
    let xhr = new XMLHttpRequest()
    xhr.open('GET', opt.url, true)
    xhr.responseType = 'blob'
    xhr.setRequestHeader('bom_front_ut', opt.bomFrontUt)
    xhr.onload = function () {
      if (this.status === 200) {
        let blob = this.response
        let reader = new FileReader()
        reader.readAsDataURL(blob)
        reader.onload = function (e) {
          let a = document.createElement('a')
          a.download = opt.fileName
          a.href = e.target.result
          document.body.appendChild(a)
          a.click()
          a.parentNode.removeChild(a)
          if (typeof success === 'function') success()
        }
      }
    }
    xhr.send()
  }
}

export default Util
