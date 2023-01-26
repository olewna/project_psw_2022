const User = require("../models/userModel");

//GET all users
const getUsers = async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
};

//POST create user
const createUser = async (req, res) => {
  const { name, type, password, email } = req.body;
  try {
    const user = await User.create({ name, type, password, email });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getUsers,
  createUser,
};
