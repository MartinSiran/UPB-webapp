const express = require('express');
const router = express.Router();
const loginUser = require('../authentication/loginUser')

router.post('/', async function(req, res, next) {
  const isAuthenticated = await loginUser.comparePassword(req.body)
  console.log("asas")
  res.send({ isAuthenticated });
});

module.exports = router;
