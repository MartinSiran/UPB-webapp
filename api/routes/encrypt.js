var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
  console.log(req.files.file)
  // res.send(req.files);

  let file = req.files.file;

  // //Use the mv() method to place the file in the upload directory (i.e. "uploads")
  file.mv('./uploads/' + file.name);
  res.send("done")
});

module.exports = router;
