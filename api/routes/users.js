var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log("ael")
  res.send(`respond with a CCCC ${process.env.DB_NAME} hhhhh`);
});

module.exports = router;
