const express = require('express')
const router = express.Router()
const database = require('../database')

router.post('/', function(req, res, next) {
  let user = req.body.username;
  let comment = req.body.comment;
  let comment_time = new Date();


  let query = "INSERT INTO comments (user, comment, comment_time) VALUES (?, ?, ?);";
  let values = [user, comment, comment_time];
  database.query(query, values,function(error, data){
    if(error){
      return res.sendStatus(500);
    }	
    else{
      res.send(`Comment with id=${data.insertId} created.`);
    }
  
	});

});

router.get('/', function(req, res, next) {
  let query = "SELECT * FROM comments";
  console.log(query);
  database.query(query, function(error, data) {
    if (error) {
      return res.sendStatus(500);
    }
    else{
      return res.send(data); 
    }
  });  
});

module.exports = router;
