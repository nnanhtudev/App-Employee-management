import db from "../models";
import bcrypt from "bcryptjs";

const salt = bcrypt.genSaltSync(10);
const checkEmailExists = async (userEmail)=>{
  let user = await db.User.findOne({
    where: {email: userEmail}
  })
  if(user){
    return true
  }
  return false
}

const checkPhoneExists = async (userPhone) => {
  let user = await db.User.findOne({
    where: { Phone: userPhone }
  })
  if (user) {
    return true
  }
  return false
}

const hashUserPassWord = (password) => {
  const hashUserPassWord = bcrypt.hashSync(password, salt);
  return hashUserPassWord;
};

const registerNewUser =  async(rawUserData) =>{
  try {
    // check user are existing
    let isEmailExists = await checkEmailExists(rawUserData.email)
    console.log(">> checkEmailExists", isEmailExists)
    if (isEmailExists === true) {
      return {
        EM: 'The email already exists',
        EC: 1
      }
    }
    let isPhoneExists = await checkPhoneExists(rawUserData.phone)
    if (isPhoneExists === true) {
      return {
        EM: 'The phone already exists',
        EC: 1
      }
    }
    //hash password
    let hashPassword = hashUserPassWord(rawUserData.password)
    //create new user
    await db.User.create({
      email: rawUserData.email,
      phone: rawUserData.phone,
      username: rawUserData.username,
      password: hashPassword
    })
    return {
      EM: 'A user is created successfully',
      EC: 0
    }
  } catch (error) {
    console.log(error)
    return {
      EM: 'Something went wrong in services',
      EC: -2
    }
  }

}

module.exports = { registerNewUser };