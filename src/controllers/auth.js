const jwt = require("jsonwebtoken");
const { comparePassword, encryptPassword } = require("../helpers/bcrypt");
const { jwtSecret } = require("../config");
const { userModel } = require("../models");

module.exports = {
  signUp: async (req, res) => {
    try {
      const { name, surname, email, password } = req.body;
      const encryptedPassword = await encryptPassword(password);
      const newUser = new userModel({
        name,
        surname,
        email,
        password: encryptedPassword
      });
      await newUser.save();
      const token = jwt.sign(JSON.stringify(newUser), jwtSecret);
      res.status(201).json({ status: true, token });
    } catch (err) {
      res.status(422).json({
        status: false,
        msg: "No se creo ningun usuario",
        error: err.message
      });
    }
  },
  signIn: async (req, res) => {
    try {
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
      res.json({ status: true, token,});
    } catch (err) {
      res.status(422).json({
        status: false,
        msg: "Ocurrio un error al intentar logearse",
        error: err.message
      });
    }
  }
};
