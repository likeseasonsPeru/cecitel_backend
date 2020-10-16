const jwt = require("jsonwebtoken");
const { comparePassword, encryptPassword } = require("../helpers/bcrypt");
const { jwtSecret } = require("../config");
const { userModel } = require("../models");

module.exports = {
  signUp: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const encryptedPassword  = await encryptPassword(password);
      const newUser = new userModel({ name, email, encryptedPassword });
      await newUser.save();
      res.status(201).json({ status: true, user: newUser });
    } catch (err) {
      res.status(422).json({
        status: false,
        msg: "No se creo ningun usuario",
        error: err.message
      });
    }
  },
  signUp: async (req, res) => {
    const { email, password } = req.body;
    const userFound = await userModel.findOne({ email });
    if (!userFound)
      return res.json({ status: false, msg: "Usuario no registrado" });
    const isCorrectPassword = await comparePassword(
      password,
      userFound.password
    );
    if (!isCorrectPassword)
      return res.json({ status: false, msg: "Password Incorrect" });
    const token = jwt.sign(JSON.stringify(userFound), jwtSecret);
    res.json({ status: true, token });
  }
};
