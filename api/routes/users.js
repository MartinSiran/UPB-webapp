var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(`respond with a CCCC ${process.env.DB_NAME} hhhhh`);
});

module.exports = router;
