const crypto = require('crypto')

//Encrypt data with publicKey
module.exports = function (dataToEncrypt, publicKey) {
    const encryptData = crypto.publicEncrypt({
        key: publicKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: 'sha256'
    },
        Buffer.from(dataToEncrypt)
    )
    return encryptData
}