const bcrypt = require("bcryptjs")
const commonPassworList = require('fxa-common-password-list');
const database = require('../database')

module.exports = {
  encryptPassword: async function(body) {
  const saltRounds = 10
  const hash = bcrypt
    .hash(body.password, saltRounds)
    .then(hash => {
      console.log('Hash with salt: ' + hash)
      // Store hash in DB with user.
      let query = "INSERT INTO users (firstname, lastname, username, password) VALUES (?, ?, ?, ?)";
      let values = [body.firstname, body.lastname, body.username, hash];

      database.query(query, values,function(error, data){
        if(error){
          console.log(error);
          return;
        }	
      });

    })
    .catch(err => console.log('Error: ' + err))
    return commonPassworList.test(body.password)
  } 
}