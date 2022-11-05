const bcrypt = require("bcrypt")

module.exports = {
  comparePassword: function(password){
    const hash = GetFromDB    //get Hash from DB
// const hash = '$2b$10$IO9V/lYJpdSi/1mdc8Yy9ewZuVIPzMxQJP1TgVOm.Dfzns72cCCgi'
const authorized = bcrypt
  .compare(password, hash)
  .then(res => {
    return(res)
  })
  .catch(err => console.log('Error: ' + err))
  return authorized
  }
}