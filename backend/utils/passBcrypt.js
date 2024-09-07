// npm install bcrypt
const bcrypt = require('bcrypt');

// 1. Create a hashPassword function that takes a password and returns a hashed password
async function hashPassword(plaintext){  // salt promise return kAREGA
    const salt= await bcrypt.genSalt(13);
    // console.log("salt:",salt)
    const hashedPassword=await bcrypt.hash(plaintext,salt);
    // console.log("hashedPassword:",hashedPassword)
     return hashedPassword
}


hashPassword("password123")
  .then((hashPassword)=>{
    console.log("hashedPassword",hashPassword);
    console.log(typeof hashPassword);
  })
  .catch((err)=>{
    console.log("Error",err);
  })

const hashedPwdFromDb="$2b$10$JgQDy1jj7a/MHgrAbbi8f.21K/.kMKBYX8p1XjD3/ojKldqyo1qpa"

async function comparePassword(plainPasswordFromLogin,hashedPwdFromDb){
    const isMatch=await bcrypt.compare(plainPasswordFromLogin,hashedPwdFromDb);
    console.log("isMatch:",isMatch);
    return isMatch;
}
comparePassword("password123",hashedPwdFromDb)






// 1.1 Use bcrypt.genSalt(10) to generate a salt // returns a promise
// 1.2 Use bcrypt.hash(password, salt) to generate a hashed password // returns a promise
// 1.3 Return the hashed password

// 2. Create a comparePassword function that takes a plain password and a hashed password and returns a boolean
// 2.1 Use bcrypt.compare() to compare the plain password with the hashed password // returns a promise
// 2.2 Return the boolean result

// Add metrics to print the time taken to hash the password and compare the password






































































/*

async function hashPassword(password) {
    const startTime = new Date().getTime();
    const salt = await bcrypt.genSalt(10);
    console.log("salt: ", salt);
    const hashedPassword = await bcrypt.hash(password, salt);
    const endTime = new Date().getTime();
    console.log("Time taken to hash the password in seconds: ", (endTime - startTime) / 1000);
    return hashedPassword;
}

async function comparePassword(plainPassword, hashedPassword) {
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
    return isMatch;
}

hashPassword('password123')
    .then((hashedPassword) => {
        console.log("hashedPassword: ", hashedPassword);
    })
    .catch((err) => {
        console.log("Error: ", err);
    });

const hashedPassword = '$2b$10$meYINbPUjbmD/yVDTvfptepeZHa/GrIE9jXnFjuGVkXaMcbJ/rppO'
comparePassword('password123', hashedPassword)
    .then((isMatch) => {
        console.log("isMatch: ", isMatch);
    })
    .catch((err) => {
        console.log("Error: ", err);
    });












const passBcrypt = {
    hashPassword: async (password) => {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    },
    comparePassword: async (password, hashedPassword) => {
        return await bcrypt.compare(password, hashedPassword);
    }
}

module.exports = passBcrypt;
*/
