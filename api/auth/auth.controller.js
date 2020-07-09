const bcrypt = require("bcryptjs");
const { insert, findBy } = require("../user/user.model");
const { generateToken } = require("./auth.service");

async function register(req, res) {
  let { username, password, department } = req.body;
  if (!username || !password || !department) {
    return res
      .status(400)
      .json({ message: "username, password and department is required" });
  }

  try {
    password = await bcrypt.hash(password, 12);
    let user = await insert({ username, password, department });
    res.status(201).json(user);
  } catch (e) {
    res.status(500).json({ message: "Unable to register new user" });
  }
}

async function login(req, res) {
  let { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "username and password is required" });
  }
  try {
    let user = await findBy({ username }).first();

    if (!user) {
      return res.status(400).json({ message: "You shall not pass!" });
    }

    let isPasswordValid = await bcrypt.compare(password, user.password);

    if (!user || !isPasswordValid) {
      return res.status(400).json({ message: "You shall not pass!" });
    }
    const token = generateToken(user);
    res.status(200).json({ message: "Welcome to our API", token });
  } catch (e) {
    res.status(500).json({ message: "You shall not pass!" });
  }
}

module.exports = { register, login };
