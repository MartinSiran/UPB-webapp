var express = require('express');
var router = express.Router();
let encrypt = require('../crypto/encrypt')


router.post('/', function(req, res, next) {
  // res.send(req.files);
  let file = req.files.file;
  let key = req.files.key

  file.mv('./uploads/' + file.name);
  let authData;
  if(key !== undefined){
    key.mv('./uploads/' + key.name);
    authData = encrypt.encrypt({ file: '../app/uploads/'+file.name,  publicKey: '../app/uploads/'+key.name})
  }else{
    authData = encrypt.encrypt({ file: '../app/uploads/'+file.name,  publicKey: ''})
  }
  res.download('/app/uploads/file.enc')
});


module.exports = router;
