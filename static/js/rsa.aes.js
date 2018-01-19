var Rsaes = {
    rsaContent:function(content) {
        var encrypt = new JSEncrypt();
        var pubkey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDSHKui7o1jtAowuWBNkE4RyufSUoxIr67AAbazN3AwFXNARpXtO96O//wClvM91uUeK/5c4mxTblv8R/Mdul8KD+yQsTULf5o6q6X2X+ppxLymZY0/7pBtvRgD6x/Qbto6Elrbl8M3Mp9Dt4sFesRpAqM31EgNsn0ji59Xy9adHQIDAQAB';
        encrypt.setPublicKey(pubkey);
        return encrypt.encrypt(content);
    },
    aesContent:function(content,key) {
        var key = CryptoJS.enc.Utf8.parse(key);
        var iv = CryptoJS.enc.Utf8.parse('1234567890123456');
        var encryptedData = CryptoJS.AES.encrypt(content, key, {
            iv:iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
        var encryptedHexStr =  encryptedData.ciphertext.toString().toUpperCase();
        var encryptedHexStr = CryptoJS.enc.Hex.parse(encryptedHexStr);
        return CryptoJS.enc.Base64.stringify(encryptedHexStr);
    },
    getKeyStr:function(n){
        var res = "";
        var chars = '0123456789qwertyuioplkjhgfdsazxcvbnm';
        for(var i = 0; i < n ; i++) {
            var id = Math.ceil(Math.random()*35);
            res += chars[id];
        }
        return res;
    },
}
