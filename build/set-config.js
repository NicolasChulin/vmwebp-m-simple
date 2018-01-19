var fs = require('fs'),
path = require('path');

var configFilePath = path.resolve(__dirname, '../src/config.js')

// var env = process.env.BUOUMALL_ENV.toLowerCase()
var env = 'dev'
var w_data = 'const CONFIG = require(\'./configs/' + env + '\')\r\nexport default CONFIG\r\n'
var w_data = new Buffer(w_data)

module.exports = function () {
  fs.writeFile(configFilePath, w_data, function (err) {
    if (err) {
      console.error(err)
    } else {
      console.log('set config success!')
    }
  })
}
