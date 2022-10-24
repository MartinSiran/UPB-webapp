
const crypto = require('crypto')
const path = require('path')
const fs = require('fs')
const decrypt = require('./decrypt')
const asymmetricEncrypt = require('./asymmetricEncrypt')

// Encryption Script
module.exports = {
  encrypt: function({file, publicKey}){
// export default function encrypt({ file, publicKey }) {
  try {
    console.log("encrypt function...")
    
    const secretKey = crypto.randomBytes(32)
    if(publicKey=== ''){
      publicKey = fs.readFileSync('/app/crypto/public_key.pem', "utf8")
    }else{
      publicKey = fs.readFileSync(publicKey, "utf8")
    }

    const encryptedSecretKey = asymmetricEncrypt(secretKey, publicKey)
    const initVect = crypto.randomBytes(16)
    const cipher = crypto.createCipheriv('aes-256-gcm', secretKey, initVect)

    const bufferFile = fs.readFileSync(file)

    const encryptedData = Buffer.concat([
      cipher.update(bufferFile),
      cipher.final(),
    ])

    console.info('Encrypted data: ' + encryptedData)

    const authTag = cipher.getAuthTag()
    const authData = {
      encryptedSecretKey: encryptedSecretKey,
      initVect: initVect,
      authTag: authTag,
      encryptedData: encryptedData,
    }
    // only for testing
    decrypt(authData)

    return authData
  } catch (err) {
    console.log(err)
    return { error: err }
  }
}
}



// encrypt({ file: './file_enc.txt',  publicKey: ''})
