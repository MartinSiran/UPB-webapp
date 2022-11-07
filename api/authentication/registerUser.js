const bcrypt = require("bcryptjs")
const commonPassworList = require('fxa-common-password-list');

module.exports = {
  encryptPassword: async function(password) {
  const saltRounds = 10
  const hash = bcrypt
    .hash(password, saltRounds)
    .then(hash => {
      console.log('Hash with salt: ' + hash)
      // Store hash in DB with user.
    })
    .catch(err => console.log('Error: ' + err))
    return commonPassworList.test(password)
  } 
}