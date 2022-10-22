const express = require('express')
const router = express.Router()
const database = require('../database')

router.post('/', function(req, res, next) {
  let provider = req.body.provider;
  let reservation_time = req.body.reservation_time;

  let query_timezone = `SET SESSION time_zone = '+2:00'`;
  database.query(query_timezone, function(error){
    if(error){
      throw error;
    }	
  });

  let query = `
	INSERT INTO reservations 
	(provider, reservation_time) 
	VALUES ("${provider}", "${reservation_time}")`;

  database.query(query, function(error, data){
    if(error){
      throw error;
    }	
    else{
      res.redirect("/");
    }

	});
});

module.exports = router;
