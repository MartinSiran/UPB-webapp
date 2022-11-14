const express = require('express');
const router = express.Router();
const database = require('../database')
const g = require('../crypto/generateKeys')

/* GET users listing. */
router.get('/', function(req, res, next) {
  // const pair = g.generateKeys()
  // console.log(Buffer.from(pair.private))
  let query = "SELECT id, username FROM users";

  database.query(query, function(error, data) {
    if(error){
      return res.sendStatus(500);
    }
    else{
      res.send(data);
    }

	});
});

module.exports = router;
