import db from "../models";

const getAllGroups = async () => {
  try {
    let group = await db.Group.findAll({
      attributes: ["id", "name", 'description'],
      order: [['name', 'ASC']]
    });
    if (group) {
      return {
        EM: 'Ok!',
        EC: 0,
        DT: group
      }
    } else {
      return {
        EM: 'Group Not Found',
        EC: -2,
        DT: []
      }
    }
  } catch (error) {
    console.log(error);
    return {
      EM: 'Something went wrong with service',
      EC: -1,
      DT: []
    }
  }
}

module.exports = { getAllGroups };