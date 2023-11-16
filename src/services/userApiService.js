import db from "../models"
import { hashUserPassWord, checkEmailExists, checkPhoneExists } from './loginRegisterService'
import { isValidFormatEmail, isValidFormatPhoneNumber } from '../utils/isValidFormat'
const getAllUser = async () => {
  try {
    let users = await db.User.findAll(
      {
        attributes: ["id", "username", "email", 'address', 'phone', 'sex'],
        include: { model: db.Group, attributes: ["name", "description"] }
      }
    )
    if (users) {
      return {
        EM: 'GET USERS SUCCESSFUL',
        EC: 0,
        DT: users
      }
    } else {
      return {
        EM: 'GET USERS NOT FOUND',
        EC: -2,
        DT: []
      }
    }
  } catch (error) {
    return {
      EM: 'Something went wrong with service',
      EC: -1,
      DT: []
    }
  }
}

const getPaginateWithUsers = async (page, limit) => {
  try {
    let offset = (page - 1) * limit
    const { count, rows } = await db.User.findAndCountAll({
      offset: offset,
      limit: limit,
      attributes: ["id", "username", "email", 'address', 'phone', 'sex'],
      include: { model: db.Group, attributes: ["name", "description", 'id'] },
      order: [
        ['id', 'DESC']
      ]
    })
    let totalPages = Math.ceil(count / limit)
    let data = {
      totalRow: count,
      totalPages: totalPages,
      users: rows
    }
    return {
      EM: 'Fetching users successfully',
      EC: 0,
      DT: data
    }
  } catch (error) {
    return {
      EM: 'Something went wrong with service',
      EC: -1,
      DT: []
    }
  }
}

const createNewUser = async (data) => {
  try {
    // check user are existing
    let checkFormatEmail = isValidFormatEmail(data.email)
    if (!checkFormatEmail) {
      return {
        EM: 'Invalid email format',
        EC: 1,
        DT: 'email'
      }
    }
    let checkFormatPhoneNumber = isValidFormatPhoneNumber(data.phone)
    if (checkFormatPhoneNumber === false) {
      return {
        EM: 'Invalid phone number. The phone number must have at least 10 digits and no letters',
        EC: 1,
        DT: 'phone'
      }
    }
    let isEmailExists = await checkEmailExists(data.email)
    if (isEmailExists === true) {
      return {
        EM: 'The email already exists',
        EC: 1,
        DT: 'email'
      }
    }
    let isPhoneExists = await checkPhoneExists(data.phone)
    if (isPhoneExists === true) {
      return {
        EM: 'The phone already exists',
        EC: 1,
        DT: 'phone'
      }
    }
    //hash password
    let hashPassword = hashUserPassWord(data.password)
    await db.User.create({ ...data, password: hashPassword })
    return {
      EM: 'Create users successfully',
      EC: 0,
      DT: []
    }
  } catch (error) {
    console.log(error)
    return {
      EM: 'Something went wrong with service',
      EC: -1,
      DT: []
    }
  }

}

const updateUser = async (data) => {
  try {
    if (!data.groupId) {
      return {
        EM: 'Error with empty groupId',
        EC: 1,
        DT: 'group'
      }
    }
    let user = await db.User.findOne(
      {
        where: { id: data.id }
      }
    )
    if (user) {
      await user.update({
        username: data.username,
        address: data.address,
        sex: data.sex,
        groupId: data.groupId
      })
      return {
        EM: 'Update user successfully',
        EC: 0,
        DT: []
      }
    } else {
      return {
        EM: 'Users not found',
        EC: -2,
        DT: []
      }
    }
  } catch (error) {
    return {
      EM: 'Something went wrong with service',
      EC: -1,
      DT: []
    }
  }
}

const deleteUser = async (id) => {
  try {
    let user = await db.User.findOne({
      where: { id }
    })
    if (user) {
      await user.destroy()
      return {
        EM: 'Delete user successfully',
        EC: 0,
        DT: []
      }
    } else {
      return {
        EM: 'User not exist',
        EC: -2,
        DT: []
      }
    }
  } catch (error) {
    return {
      EM: 'Something went wrong with service',
      EC: -1,
      DT: []
    }
  }
}

module.exports = { getAllUser, createNewUser, updateUser, deleteUser, getPaginateWithUsers }