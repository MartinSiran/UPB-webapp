const bcrypt = require("bcryptjs")

module.exports = {
  comparePassword: function(password){
  // const hash = GetFromDB    //get Hash from DB
  const hash = '$2a$10$LEn/vWeaQ/KC5Oardqb6kurjmDVOJw0h1mO6SA.ZiheIhBrQEesKG'
  const isAuthenticated = bcrypt
    .compare(password, hash)
    .then(res => {
      return(res)
    })
    .catch(err => console.log('Error: ' + err))
    return isAuthenticated
  }
}