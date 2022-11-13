const bcrypt = require("bcryptjs")
const database = require ('../database')

module.exports = {
  comparePassword: async function(body){
  let hash = await queryHash(body.username);
  // const hash = GetFromDB    //get Hash from DB
 

  const isAuthenticated = bcrypt
    .compare(body.password, hash)
    .then(res => {
      return(res)
    })
    .catch(err => console.log('Error: ' + err))
    return isAuthenticated
  }
        
  // const hash = '$2a$10$LEn/vWeaQ/KC5Oardqb6kurjmDVOJw0h1mO6SA.ZiheIhBrQEesKG'  
}

function queryHash(username){
  return new Promise((resolve, reject)=> {
    let query = "SELECT * FROM users WHERE username=?";
    let values = [username];

    database.query(query, values,function(error, data){
      if(error){
        console.log(error);
        reject(error);
      }	
      
      if(data && data.length > 0){
        let hash = data[0].password
        resolve(hash)
      }else{
        // let hash = "";
        reject(error);
      }
    });
  })
  

}