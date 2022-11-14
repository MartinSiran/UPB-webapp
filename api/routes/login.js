const express = require('express');
let session = require('express-session');
const router = express.Router();
const loginUser = require('../authentication/loginUser')
const database = require('../database')


const getUser = async (userName) => {
  const query = "SELECT id FROM users WHERE username=(?)"
  return new Promise((resolve, reject) => {
      database.query(query, [userName], (error, data) => {
          if (error) {
              reject(error)
          }
          resolve(data[0].id)
      })
  })
}

router.post('/', async function(req, res, next) {
  const isAuthenticated = await loginUser.comparePassword(req.body)
  console.log(req.body)

  let userId = await getUser(req.body.username)
  if (isAuthenticated){ 
    console.log(req.sessionID)
    session=req.session;
    session.userid=req.body.username;
    session.userrealid=userId;
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
    res.send({loggedIn: true, user: session.userid, userId: session.userrealid})
  }else{
    // res.send(`Newelcome`);
    res.send({loggedIn: false})
  }
});

module.exports = router;
