const express = require('express')
const router = express.Router()
const database = require('../database')
let encrypt = require('../crypto/encrypt')

router.post('/', (req, res, next) => {
  let title = req.body.title;
  let provider = req.body.provider;
  let event_time = req.body.event_time;

  let query_timezone = `SET SESSION time_zone = '+2:00'`;
  database.query(query_timezone, function (error) {
    if (error) {
      throw error;
    }
  });

  let query = "INSERT INTO events (title, provider, event_time) VALUES (?, ?, ?)";
  let values = [title, provider, event_time];

  database.query(query, values, (error, data) => {
    if (error) {
      return res.sendStatus(500);
    } else {
      res.send(`Event with id=${data.insertId} created.`);
    }

  });
});

router.get('/', (req, res, next) => {
  let query = "SELECT * FROM events";
  database.query(query, (error, data) => {
    if (error) {
      return res.sendStatus(500);
    } else {
      return res.send(data);
    }
  });
});


router.post('/reserve', (req, res, next) => {
  let userId = req.body.userId;
  let eventId = req.body.eventId;

  let query = "UPDATE events (user_id) VALUES (?) WHERE id=? AND user_id IS NOT NULL";
  let values = [userId, eventId];

  database.query(query, values, (error, data) => {
    if (error) {
      return res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});

module.exports = router;
