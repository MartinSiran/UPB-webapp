const express = require('express');
const router = express.Router();
const loginUser = require('../authentication/loginUser')


router.post('/', async function(req, res, next) {
  const isAuthenticated = await loginUser.comparePassword(req.body)
  if (isAuthenticated){ 
    console.log(req.sessionID)
    session=req.session;
    session.userid=req.body.username;
    console.log(req.session)
  }
  // res.send({ isAuthenticated });
  res.redirect('/');

});

router.get('/logout',(req,res) => {
  req.session.destroy();
  res.send({loggedIn: false})
});

router.get('/', function(req, res, next) {
  session = req.session;
  console.log(session.userid)
  if(session.userid){
    // res.send("Welcome User")
    res.send({loggedIn: true, user: session.userid})
  }else{
    // res.send(`Newelcome`);
    res.send({loggedIn: false})
  }
});

module.exports = router;
