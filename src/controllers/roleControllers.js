import roleApiService from "../services/roleApiService";
const readFunc = async (req, res) => {
  try {
    let data = await roleApiService.getAllRoles();
    return res.status(200).json({
      EM: data.EM, //error message,
      EC: data.EC, //error code
      DT: data.DT, //data
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "error from server", //error message,
      EC: -1, //error code
      DT: "", //data
    });
  }
};

const createFunc = async (req, res) => {
  try {
    let data = await roleApiService.createNewRole(req.body);
    return res.status(200).json({
      EM: data.EM, //error message,
      EC: data.EC, //error code
      DT: data.DT, //data
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "error from server", //error message,
      EC: -1, //error code
      DT: "", //data
    });
  }
};

const updateFunc = async (req, res) => {
  try {
    let data = await roleApiService.updateUser(req.body);
    return res.status(200).json({
      EM: data.EM, //error message,
      EC: data.EC, //error code
      DT: data.DT, //data
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "error from server", //error message,
      EC: -1, //error code
      DT: "", //data
    });
  }
};
const deleteFunc = async (req, res) => {
  try {
    let data = await roleApiService.deleteRoles(req.body.id);
    return res.status(200).json({
      EM: data.EM, //error message,
      EC: data.EC, //error code
      DT: data.DT, //data
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "error from server", //error message,
      EC: -1, //error code
      DT: "", //data
    });
  }
};

const getUserAccount = async (req, res) => {
  try {
    return res.status(200).json({
      EM: "Ok!", //error message,
      EC: 0, //error code
      DT: {
        access_token: req.token,
        groupWithRoles: req.user.groupWithRoles,
        email: req.user.email,
        username: req.user.username,
      }, //data
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "error from server", //error message,
      EC: -1, //error code
      DT: "", //data
    });
  }
};

module.exports = { readFunc, createFunc, updateFunc, deleteFunc };
