import connection from "../config/Database";
const getHomepage = async (req, res) => {
  const [results, fields] = await connection.query("select * from Users");
  console.log(results);
  res.render("home", { users: results });
};
const getUsers = (req, res) => {
  res.render("users");
};

module.exports = { getHomepage, getUsers };
