const crypto = require('crypto');
const path = require('path');
const fs = require('fs');


function print(plainText) {

  const absolutePath = path.resolve('./public_key.pem')

  const publicKey = fs.readFileSync(absolutePath, "utf8")
  const encrypted = crypto.publicEncrypt({
    key: fs.readFileSync('public_key.pem', 'utf8'),
    padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
    oaepHash: 'sha256'
  },
    // We convert the data string to a buffer
    Buffer.from(plainText)
  )
  console.log(encrypted.toString("base64"))

  console.log('Public key: ' + publicKey)

  const decryptedText = crypto.privateDecrypt(
    {
      key: fs.readFileSync('private_key.pem', 'utf8').toString(),
      // In order to decrypt the data, we need to specify the
      // same hashing function and padding scheme that we used to
      // encrypt the data in the previous step
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: 'sha256'
    },
    encrypted
  )

  console.log('Decrypted data: ' + decryptedText)

}


print('PlainText')