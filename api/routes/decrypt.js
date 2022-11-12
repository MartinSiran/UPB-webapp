var express = require('express');
var router = express.Router();
let decrypt = require('../crypto/decrypt')
const fs = require('fs')


router.post('/', async function(req, res) {
  let file = req.files.file;
  let key = req.files.key

  console.log("decrypt")
  console.log(file)

  await file.mv('./uploads/file2decrypt', (err) => {
    if (err) throw err;
    console.log(`moved ${file.name} to ./uploads/file2encrypt`)
  });
  key.mv('./uploads/privateKey');
  let encryptedData = JSON.parse(file.data);
  console.log("----> decrypting file: " + encryptedData.fileName)
  encryptedData = {
    encryptedSecretKey: Buffer.from(encryptedData.encryptedSecretKey),
    initVect: Buffer.from(encryptedData.initVect),
    authTag: Buffer.from(encryptedData.authTag),
    encryptedData: Buffer.from(encryptedData.encryptedData),
    privateKey: key.data,
    fileName: file.name
  }

  res.send(decrypt(encryptedData))
});

module.exports = router;
