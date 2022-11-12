var express = require('express');
var router = express.Router();
let encrypt = require('../crypto/encrypt')
let db = require('../database')


router.post('/', function(req, res) {
  let file = req.files.file;
  let key = req.files.key

  let encryptedFile = encrypt.encrypt({ file: file.data,  publicKey: key.data})
  encryptedFile.fileName = file.name
  res.send(JSON.stringify(encryptedFile))
});

module.exports = router;
