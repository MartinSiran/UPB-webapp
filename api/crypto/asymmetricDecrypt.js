const crypto = require('crypto')
const fs = require('fs')


// Decrypt data with private key
module.exports = function (dataToDecrypt, privateKey) {
    const decryptedData = crypto.privateDecrypt({
        key: privateKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: 'sha256'
    },
        dataToDecrypt
    )
    return decryptedData
}
