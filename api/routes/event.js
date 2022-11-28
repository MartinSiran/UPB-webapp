const express = require('express')
const router = express.Router()
const database = require('../database')
let encrypt = require('../crypto/encrypt')

router.post('/', function(req, res, next) {
  let title = req.body.title;
  let provider = req.body.provider;
  let event_time = req.body.event_time;

  let query_timezone = `SET SESSION time_zone = '+2:00'`;
  database.query(query_timezone, function(error){
    if(error){
      throw error;
    }	
  });

  let query = "INSERT INTO events (title, provider, event_time) VALUES (?, ?, ?)";
  let values = [title, provider, event_time];

  database.query(query, values,function(error, data){
    if(error){
      return res.sendStatus(500);
    }	
    else{
      res.send(`Event with id=${data.insertId} created.`);
    }

	});
});

router.get('/', function(req, res, next) {
  let query = "SELECT * FROM events";
  database.query(query, function(error, data) {
    if (error) {
      return res.sendStatus(500);
    }
    else{
      return res.send(data); 
    }
  });  
});

router.get('/search/:filter', function(req, res, next) {
  let query = "SELECT * FROM events WHERE LOWER(provider) LIKE ? OR LOWER(title) LIKE ?";
  database.query(query, ['%'+req.params.filter.toLowerCase()+'%', '%'+req.params.filter.toLowerCase()+'%'], function(error, data) {
    if (error) {
      console.log(error)
      return res.sendStatus(500);
    }
    else{
      return res.send(data);
    }
  });
});

module.exports = router;
