const { generateKeyPairSync } = require('crypto');
const keypair = require('keypair');
const forge = require('node-forge');
const fs = require('fs');

// Script for generating asymmetric public and private keys 
// and save them to appropiate files
function generateKeys () {  
  const pair = keypair()
  const privateKey = pair.private
  const publicKey = pair.public

  console.log(pair)
  return pair

  fs.writeFile('public_key.pem', publicKey, (err) => {
    if (err) {
      throw err;
    } 
    console.log("The file has been saved!");
  })

  fs.writeFile('private_key.pem', privateKey, (err) => {
    if (err) {
      throw err;
    } 
    console.log("The file has been saved!");
  })
}

module.exports = {generateKeys: generateKeys}
