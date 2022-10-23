const express = require('express')
const router = express.Router()
const database = require('../database')

router.post('/', function(req, res, next) {
  let title = req.body.title;
  let provider = req.body.provider;
  let reservation_time = req.body.reservation_time;

  let query_timezone = `SET SESSION time_zone = '+2:00'`;
  database.query(query_timezone, function(error){
    if(error){
      throw error;
    }	
  });

  let query = "INSERT INTO reservations (title, provider, reservation_time) VALUES (?, ?, ?)";
  let values = [title, provider, reservation_time];

  database.query(query, values,function(error, data){
    if(error){
      throw error;
    }	
    else{
      res.redirect("/");
    }

	});
});

router.get('/', function(req, res, next) {
  let query = "SELECT * FROM reservations";
  database.query(query, function(error, data) {
    if (error) {
      throw error;
    }
    else{
      return res.send(data); 
    }
  });  
});


module.exports = router;
