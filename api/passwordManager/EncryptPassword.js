const bcrypt = require("bcrypt")

module.exports = {
  encryptPassword: async function(password){
const saltRounds = 10
const hash = bcrypt
  .hash(password, saltRounds)
  .then(hash => {
    return hash // DELETE THIS
    // Store hash in your password DB.
  })
  .catch(err => console.log('Error: ' + err))
  return hash
  } 
}