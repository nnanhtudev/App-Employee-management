import userApiService from '../services/userApiService'

const readFunc = async (req, res) => {
  try {
    if (req.query.page && req.query.limit) {
      let page = req.query.page
      let limit = req.query.limit
      let data = await userApiService.getPaginateWithUsers(+page, +limit)
      return res.status(200).json({
        EM: data.EM, //error message,
        EC: data.EC, //error code
        DT: data.DT, //data
      })
    } else {
      let data = await userApiService.getAllUser()
      return res.status(200).json({
        EM: data.EM, //error message,
        EC: data.EC, //error code
        DT: data.DT, //data
      })
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      EM: 'error from server', //error message,
      EC: -1, //error code
      DT: '', //data
    })
  }
}

const createFunc = async (req, res) => {
  try {
    let newUser = await userApiService.createNewUser()
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      EM: 'error from server', //error message,
      EC: -1, //error code
      DT: '', //data
    })
  }
}

const updateFunc = async (req, res) => {
  try {
    let updatedUser = await userApiService.updateUser()
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      EM: 'error from server', //error message,
      EC: -1, //error code
      DT: '', //data
    })
  }
}
const deleteFunc = async (req, res) => {
  try {
    let deletedUser = await userApiService.deleteUser()
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      EM: 'error from server', //error message,
      EC: -1, //error code
      DT: '', //data
    })
  }
}

module.exports = { readFunc, createFunc, updateFunc, deleteFunc }