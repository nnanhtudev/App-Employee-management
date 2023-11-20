import "dotenv/config";

const { registerNewUser, handleLoginUser } = require("../services/loginRegisterService")

const testAPI = (req, res) => {
  return res.status(200).json({
    message: 'ok',
    data: 'test'
  })
}
const handleRegister = async (req, res) => {
  try {
    //req.body email, phone, username, password
    if (!req.body.email || !req.body.phone || !req.body.password) {
      return res.status(200).json({
        EM: 'Missing require parameter', //error message,
        EC: '-1', //error code
        DT: '', //data
      })
    }
    if (req.body.password && req.body.password.length < 3) {
      return res.status(200).json({
        EM: 'Password must be at least 8 characters long', //error message,
        EC: '-1', //error code
        DT: '', //data
      })
    }
    //call service: create new account
    console.log('Call Register', req.body);
    let data = await registerNewUser(req.body)
    return res.status(200).json({
      EM: data.EM, //error message,
      EC: data.EC, //error code
      DT: '', //data
    })
  } catch (error) {
    return res.status(500).json({
      EM: 'error from server', //error message,
      EC: -1, //error code
      DT: '', //data
    })
  }
}

const handleLogin = async (req, res) => {
  try {
    let data = await handleLoginUser(req.body)
    //set cookie
    res.cookie('jwt', data.DT.access_token, { httpOnly: true, maxAge: 60 * 60 * 1000 })
    return res.status(200).json({
      EM: data.EM, //error message,
      EC: data.EC, //error code
      DT: data.DT, //data
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      EM: 'error from server', //error message,
      EC: -1, //error code
      DT: '', //data
    })
  }

}

module.exports = { testAPI, handleRegister, handleLogin };