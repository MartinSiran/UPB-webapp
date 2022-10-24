const crypto = require('crypto')
const path = require('path')
const fs = require('fs')
const decrypt = require('./decrypt')
const asymmetricEncrypt = require('./asymmetricEncrypt')

// Encryption Script
export default function encrypt({ file, publicKey }) {
  try {
    console.log("encrypt function...")
    const secretKey = crypto.randomBytes(32)
    
    publicKey = fs.readFileSync('./public_key.pem', "utf8")
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
    return { error: err }
  }
}


encrypt({ file: './file_enc.txt',  publicKey: ''})
