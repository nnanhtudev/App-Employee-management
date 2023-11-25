"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      /**
       * The Group.hasMany(User) association means that a One-To-Many relationship exists between Group and User,
       * with the foreign key being defined in the target model (User).
       * The `models/index` file will call this method automatically.
       */
      Group.hasMany(models.User, { foreignKey: "groupId" });
      //A.belongsToMany(B, { through: 'C' })
      Group.belongsToMany(models.Role, { through: "Group_Role", foreignKey: "groupId" });
    }
  }
  Group.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Group",
    }
  );
  return Group;
};
