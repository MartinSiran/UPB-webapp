const express = require('express');
const router = express.Router();
const database = require('../database')

/* GET users listing. */
router.get('/', function(req, res, next) {
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
