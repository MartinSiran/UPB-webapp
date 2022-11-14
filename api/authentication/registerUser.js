const bcrypt = require("bcryptjs")
const commonPassworList = require('fxa-common-password-list');
const database = require('../database')

module.exports = {
  encryptPassword: async function(body) {

  let continueCheck = await queryUsernames(body.username);
  if (continueCheck == false){
    console.log("uz v db")
    return {commonPass: null, isCreated: false};
  }
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
    // return commonPassworList.test(body.password)
    return {commonPass: commonPassworList.test(body.password), isCreated: true};
  }
} 

  function queryUsernames(username){
    return new Promise((resolve, reject)=> {
      let query = "SELECT username FROM users WHERE username=?";
      let values = [username];
  
      database.query(query, values,function(error, data){
        if(error){
          console.log(error);
          reject(error);
        }	
        if(data[0] != null){
          resolve(false)
        }else{
          resolve(true)
        }
      });
    })
}