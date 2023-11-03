"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      /**
       * The User.belongsTo(Group) association means that a One-To-One relationship exists between User and Group,
       * with the foreign key being defined in the source model (User).
       *
       */
      User.belongsTo(models.Group);
      User.hasMany(models.Project);
      //A.belongsToMany(B, { through: 'C' })
      User.belongsToMany(models.Project, { through: "Project_User" });
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      address: DataTypes.STRING,
      sex: DataTypes.STRING,
      phone: DataTypes.STRING,
      groupId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
