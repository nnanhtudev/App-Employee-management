import db from "../models/index";

const createNewRole = async (roles) => {
  try {
    let currentRole = await db.Role.findAll({
      attributes: ["url", "description"],
      raw: true,
    });
    let persists = roles.filter(({ url: url1 }) => !currentRole.some(({ url: url2 }) => url1 === url2));
    if (persists.length === 0) {
      return {
        EM: "Nothing to create",
        EC: -1,
        DT: [],
      };
    }
    await db.Role.bulkCreate(persists);
    return {
      EM: `Create roles success: ${persists.length} role ...!`,
      EC: 0,
      DT: [],
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "Something went wrong with service",
      EC: -1,
      DT: [],
    };
  }
};

const getAllRoles = async () => {
  try {
    let data = await db.Role.findAll({ attributes: ["id", "url", "description"], order: [["id", "DESC"]] });
    return {
      EM: `Get all roles success`,
      EC: 0,
      DT: data,
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "Something went wrong with service",
      EC: -1,
      DT: [],
    };
  }
};

const deleteRoles = async (id) => {
  try {
    let role = await db.Role.findOne({
      where: { id: id },
    });
    if (role) {
      await role.destroy();
    }

    return {
      EM: `Delete roles success`,
      EC: 0,
      DT: "",
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "Something went wrong with service",
      EC: -1,
      DT: [],
    };
  }
};
module.exports = { createNewRole, getAllRoles, deleteRoles };
