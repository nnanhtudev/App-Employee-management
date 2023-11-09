import db from "../models"

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
      attributes: ["id", "username", "email", 'address', 'phone', 'sex'],
      include: { model: db.Group, attributes: ["name", "description"] },
      offset: offset,
      limit: limit,
      order: [
        ['id', 'ASC']
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
    await db.User.create({
      data
    })
  } catch (error) {
    console.log(error)
  }

}

const updateUser = async (data) => {
  try {
    let user = await db.User.findOne(
      {
        where: { id: data.id }
      }
    )
    if (user) {
      user.save({})
    } else {
      return {
        EM: 'GET UPDATED USERS NOT FOUND',
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
    await db.User.delete({
      where: { id }
    })
  } catch (error) {
    console.log(error)
  }
}

module.exports = { getAllUser, createNewUser, updateUser, deleteUser, getPaginateWithUsers }