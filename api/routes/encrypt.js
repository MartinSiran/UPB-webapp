var express = require('express');
var router = express.Router();
let encrypt = require('../crypto/encrypt')
let db = require('../database')


router.post('/', async function(req, res) {
  let file = req.files.file;
  let key = req.files.key

  console.log("encrypt")
  console.log("---> encrypting file:" + file.name)

  let encryptedFile = encrypt.encrypt({ file: file.data,  publicKey: key.data})
  encryptedFile.fileName = file.name
  res.send(JSON.stringify(encryptedFile))
  return
  db.query(
    "INSERT INTO files (file) VALUES (?)",
    [JSON.stringify(encryptedFile)],
    (error, data) => {
      if (error) {
        console.log(error)
        return res.sendStatus(500);
      } else {
        res.send(`File with id=${data.insertId} created.`);
      }
    }
  )
  // res.download('/app/uploads/file.enc')
});

module.exports = router;
