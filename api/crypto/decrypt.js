const crypto = require('crypto')
const fs = require('fs')
const asymmetricDecrypt = require('./asymmetricDecrypt')


module.exports = function ({ encryptedData, encryptedSecretKey, authTag, initVect, privateKey, fileName }) {
  try {
    console.log('decrypt function...')
    const secretKey = asymmetricDecrypt(encryptedSecretKey, privateKey)

    const decipher = crypto.createDecipheriv('aes-256-gcm', secretKey, initVect)
    decipher.setAuthTag(authTag)
    const bufferFile = encryptedData

    const decryptedData = Buffer.concat([
      decipher.update(bufferFile),
      decipher.final(),
    ])

    console.log('Decrypted data: ' + decryptedData)
    return decryptedData
  } catch (err) {
    console.log("ERROR: " + err)
    return { error: err }
  }
}
