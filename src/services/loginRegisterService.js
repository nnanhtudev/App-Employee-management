import "dotenv/config";
import db from "../models";
import bcrypt from "bcryptjs";
import { Op } from "sequelize";
import { getGroupsWithRoles } from "./JWTService";
import { createJWT } from '../middleware/JWTAction';

const salt = bcrypt.genSaltSync(10);
const checkEmailExists = async (userEmail) => {
  let user = await db.User.findOne({
    where: { email: userEmail }
  })
  if (user) {
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

const registerNewUser = async (rawUserData) => {
  try {
    // check user are existing
    let isEmailExists = await checkEmailExists(rawUserData.email)
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
      password: hashPassword,
      groupId: 4
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
const checkPassword = (inputPassword, hashPassword) => {
  return bcrypt.compareSync(inputPassword, hashPassword); // true or false
}

const handleLoginUser = async (rawData) => {
  try {
    let user = await db.User.findOne({
      where: {
        [Op.or]: [
          { email: rawData.valueLogin },
          { phone: rawData.valueLogin }
        ]
      }
    })
    if (user) {
      let isCorrectPassword = checkPassword(rawData.password, user.password)
      if (isCorrectPassword === true) {

        //test roles
        let groupWithRoles = await getGroupsWithRoles(user)
        //Create payload
        let payload = {
          email: user.email,
          groupWithRoles,
          expiresIn: process.env.JWT_EXPIRES_IN
        }
        let token = createJWT(payload)
        return {
          EM: 'Ok!',
          EC: 0,
          DT: {
            access_token: token,
            groupWithRoles
          }
        }
      }
    }
    return {
      EM: 'Your email/phone number or password is incorrect',
      EC: 1,
      DT: ''
    }

  } catch (error) {
    console.log(error)
    return {
      EM: 'Something went wrong in services',
      EC: -2
    }
  }
}

module.exports = { registerNewUser, handleLoginUser, hashUserPassWord, checkEmailExists, checkPhoneExists };