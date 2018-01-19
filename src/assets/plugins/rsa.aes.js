let Rsaes = {
  rsaContent (content) {
    let encrypt = new JSEncrypt()
    let pubkey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDSHKui7o1jtAowuWBNkE4RyufSUoxIr67AAbazN3AwFXNARpXtO96O//wClvM91uUeK/5c4mxTblv8R/Mdul8KD+yQsTULf5o6q6X2X+ppxLymZY0/7pBtvRgD6x/Qbto6Elrbl8M3Mp9Dt4sFesRpAqM31EgNsn0ji59Xy9adHQIDAQAB'
    encrypt.setPublicKey(pubkey)
    return encrypt.encrypt(content)
  },
  aesContent (content, key) {
    let keys = CryptoJS.enc.Utf8.parse(key)
    let iv = CryptoJS.enc.Utf8.parse('1234567890123456')
    let encryptedData = CryptoJS.AES.encrypt(content, keys, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    })
    let encryptedHexStr = encryptedData.ciphertext.toString().toUpperCase()
    encryptedHexStr = CryptoJS.enc.Hex.parse(encryptedHexStr)
    return CryptoJS.enc.Base64.stringify(encryptedHexStr)
  },
  getKeyStr (n) {
    let res = ''
    let chars = '0123456789qwertyuioplkjhgfdsazxcvbnm'
    for (let i = 0; i < n; i++) {
      let id = Math.ceil(Math.random() * 35)
      res += chars[id]
    }
    return res
  }
}

export default Rsaes
