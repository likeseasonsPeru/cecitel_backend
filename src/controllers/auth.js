const jwt = require("jsonwebtoken");
const { comparePassword, encryptPassword } = require("../helpers/bcrypt");
const { jwtSecret } = require("../config");
const { userModel, teacherModel } = require("../models");


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
      const userFound = await userModel.findOne({ email }, {courses: 0, purchases: 0, favorites: 0});
      if (!userFound)
        return res.json({ status: false, msg: "Usuario no registrado" });
      const isCorrectPassword = await comparePassword(
        password,
        userFound.password
      );
      if (!isCorrectPassword)
        return res.json({ status: false, msg: "Password incorrecto" });
      const token = jwt.sign(JSON.stringify(userFound), jwtSecret);
      res.json({ status: true, token,});
    } catch (err) {
      res.status(500).json({
        status: false,
        msg: "Ocurrio un error al intentar logearse",
        error: err.message
      });
    }
  },


  signInTeacher: async (req, res) => {
    try {
      const {email, password} = req.body;
      const teacherFound = await teacherModel.findOne({email}, {courses: 0})
      if (!teacherFound)
        return res.json({status: false, msg: 'Profesor no registrado'})
      const isCorrectPassword = await comparePassword(
          password,
          teacherFound.password
      );
      if (!isCorrectPassword)
        return res.json({status: false, msg: 'Password incorrecto'})
      const token = jwt.sign(JSON.stringify(teacherFound), jwtSecret)
      res.json({status: true, token})
    } catch (err){
      res.status(500).json({
        status: false,
        msg: "Ocurrio un error al intentar logearse",
        error: err.message
      });
    }
  },
};
