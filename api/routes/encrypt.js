var express = require('express');
var router = express.Router();
let encrypt = require('../crypto/encrypt')


router.post('/', function(req, res, next) {
  console.log(req.files.file)
  // res.send(req.files);

  let file = req.files.file;
  file.mv('./uploads/' + file.name);
  let authData = encrypt.encrypt({ file: '../app/uploads/'+file.name,  publicKey: ''})
  // //Use the mv() method to place the file in the upload directory (i.e. "uploads")
  
  res.send(authData)
});

module.exports = router;
