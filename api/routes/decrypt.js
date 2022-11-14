const express = require('express');
const router = express.Router();
const decrypt = require('../crypto/decrypt')
const fs = require('fs')

router.post('/', function(req, res) {
  let file = req.files.file;
  let key = req.files.key
  console.log(file)

  const fileData = fs.readFileSync(file.tempFilePath)
  let encryptedData = JSON.parse(fileData);
  encryptedData = {
    encryptedSecretKey: Buffer.from(encryptedData.encryptedSecretKey),
    initVect: Buffer.from(encryptedData.initVect),
    authTag: Buffer.from(encryptedData.authTag),
    encryptedData: Buffer.from(encryptedData.encryptedData),
    privateKey: fs.readFileSync(key.tempFilePath),
    fileName: file.name
  }

  res.send(decrypt(encryptedData))
});

module.exports = router;
