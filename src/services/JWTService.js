import db from "../models/index";

const getGroupsWithRoles = async (user) => {
  let rolesByGroup = await db.Group.findOne({
    where: { id: user.groupId },
    attributes: ["id", "name", "description"],
    include: {
      model: db.Role,
      attributes: ["id", "url", "description"],
      through: { attributes: [] },
    },
  });
  if (!rolesByGroup) {
    console.log("Group not found");
    return {};
  }
  return rolesByGroup ? rolesByGroup : {};
};

module.exports = { getGroupsWithRoles };
