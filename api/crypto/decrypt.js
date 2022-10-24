const crypto = require('crypto')
const fs = require('fs')
const asymmetricDecrypt = require('./asymmetricDecrypt')


module.exports = function ({ encryptedData, encryptedSecretKey, authTag, initVect, privateKey }) {
  try {
    console.log('decrypt function...')
    privateKey = fs.readFileSync('/app/crypto/private_key.pem', "utf8")
    const secretKey = asymmetricDecrypt(encryptedSecretKey, privateKey)

    const decipher = crypto.createDecipheriv('aes-256-gcm', secretKey, initVect)
    decipher.setAuthTag(authTag)
    const bufferFile = encryptedData

    console.log("BufferENCRFile: " + bufferFile)

    const decryptedData = Buffer.concat([
      decipher.update(bufferFile),
      decipher.final(),
    ])

    console.log('Decrypted data: ' + decryptedData)
    return { decryptedData: decryptedData }
  } catch (err) {
    console.log("ERROR: " + err)
    return { error: err }
  }
}