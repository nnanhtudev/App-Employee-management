const getHomepage = (req, res) => {
  res.render("home");
};
const getUsers = (req, res) => {
  res.render("users");
};

module.exports = { getHomepage, getUsers };
