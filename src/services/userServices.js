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
  }
};

const getAllUsers = async () => {
  try {
    const [results, fields] = await promisePool.query("select * from Users");
    return results;
  } catch (error) {
    console.log(error);
  }
};

const getUpdateUserById = async (id) => {
  // SELECT * FROM Customers WHERE Country='Mexico';
  try {
    const [results, fields] = await promisePool.query("SELECT * FROM Users WHERE id =?", [id]);
    let users = results && results.length > 0 ? results[0] : {};
    return users;
  } catch (error) {
    console.log(error);
  }
};

const updateUsers = async (email, username, id) => {
  // UPDATE Users SET email = ?, username = ?, WHERE id = ? ;
  try {
    const [results, fields] = await promisePool.query("UPDATE Users SET email = ?, username = ? WHERE id = ?", [
      email,
      username,
      id,
    ]);
  } catch (error) {
    console.log(error);
  }
};

const deleteUserById = async (id) => {
  try {
    const [results, fields] = await promisePool.query("DELETE FROM Users WHERE id = ?", [id]);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getAllUsers, createAUsers, deleteUserById, getUpdateUserById, updateUsers };
