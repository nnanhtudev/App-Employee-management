import promisePool from "../config/Database";
import bcrypt from "bcryptjs";
import db from "../models";
const salt = bcrypt.genSaltSync(10);

const hashPassWord = (password) => {
  const hashPassWord = bcrypt.hashSync(password, salt);
  return hashPassWord;
};

const createAUsers = async (email, username, password) => {
  let hashPass = hashPassWord(password);
  try {
    await db.User.create({
      username: username,
      email: email,
      password: hashPass,
    });
  } catch (error) {
    console.log(error);
    return {
      EM: "Something went wrong with service",
      EC: -1,
      DT: [],
    };
  }
};

const getAllUsers = async () => {
  //test relationship

  let newUser = await db.User.findOne({
    where: { id: 1 },
    attributes: ["username", "email"],
    include: { model: db.Group, attributes: ["name", "description"] },
    raw: true,
    nest: true,
  });

  let roles = await db.Role.findAll({
    include: { model: db.Group, where: { id: 1 } },
    raw: true,
    nest: true,
  });

  try {
    let user = await db.User.findAll({});
    return user;
  } catch (error) {
    console.log(error);
    return {
      EM: "Something went wrong with service",
      EC: -1,
      DT: [],
    };
  }
};

const getUpdateUserById = async (id) => {
  // SELECT * FROM Customers WHERE Country='Mexico';
  try {
    let user = db.User.findOne({ where: { id } });
    return user.get({ plain: true });
  } catch (error) {
    console.log(error);
    return {
      EM: "Something went wrong with service",
      EC: -1,
      DT: [],
    };
  }
};

const updateUsers = async (email, username, id) => {
  try {
    await db.User.update(
      { email, username },
      {
        where: {
          id,
        },
      }
    );
  } catch (error) {
    console.log(error);
    return {
      EM: "Something went wrong with service",
      EC: -1,
      DT: [],
    };
  }
};

const deleteUserById = async (id) => {
  try {
    await db.User.destroy({
      where: { id },
    });
  } catch (error) {
    console.log(error);
    return {
      EM: "Something went wrong with service",
      EC: -1,
      DT: [],
    };
  }
};

module.exports = { getAllUsers, createAUsers, deleteUserById, getUpdateUserById, updateUsers };
