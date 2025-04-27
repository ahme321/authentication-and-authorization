import crypto from 'crypto';
-
function hashPassword(password) {

  const salt = crypto.randomBytes(16).toString('hex');

  
  const hash = crypto(
    

    password,
    salt,
    100000,
    64,     
    'sha512' 
  ).toString('hex');

  
  return '${salt}:${hash}';
}


const plainPassword = 'mysecretpassword';
const hashedPasswordString = hashPassword(plainPassword);


const [retrievedSalt, retrievedHash] = hashedPasswordString.split(':');
console.log('Retrieved salt: ${retrievedSalt}');
console.log('Retrieved hash: ${retrievedHash}');



function verifyPassword(password, storedHash) {
  // 1. Split the stored hash to extract the salt and the actual hash
  

  
  const computedHash = crypto(
    password,
    salt,
    100000, 
    64,     
    'sha512'
  ).toString('hex');

  
  return computedHash === storedPasswordHash;
}


const plainPasswordToVerify = 'mysecretpassword';
const incorrectPassword = 'wrongpassword';

const verificationResultCorrect = verifyPassword(plainPasswordToVerify, hashedPasswordString);
console.log('Verification with correct password: ${verificationResultCorrect}'); 

const verificationResultIncorrect = verifyPassword(incorrectPassword, hashedPasswordString);
console.log('Verification with incorrect password: ${verificationResultIncorrect}');