const express = require('express');
const router = express.Router();
const registerUser = require('../authentication/registerUser')



router.post('/', async function(req, res, next) {
  const isPasswordCommon = await registerUser.encryptPassword(req.body.password)
  res.send({ isPasswordCommon });
});

module.exports = router;
