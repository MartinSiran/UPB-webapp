var express = require('express');
var router = express.Router();
let decrypt = require('../crypto/decrypt')

router.post('/', function(req, res) {
  let file = req.files.file;
  let key = req.files.key

  let encryptedData = JSON.parse(file.data);
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
