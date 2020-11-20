const jwt = require("jsonwebtoken");
const { comparePassword, encryptPassword } = require("../helpers/bcrypt");
const { jwtSecret } = require("../config");
const { userModel, teacherModel } = require("../models");

module.exports = {
  signUp: async (req, res) => {
    try {
      const { name, surname, dni, email, password } = req.body;
      const encryptedPassword = await encryptPassword(password);
      const newUser = new userModel({
        name,
        surname,
        email,
        dni,
        password: encryptedPassword
      });
      // await newUser.save();
      newUser.save((err, postUser) => {
        if (err)
          return res.status(202).json({
            status: false,
            msg: "Ya existe un usuario con este email"
          });
        else {
          const token = jwt.sign(JSON.stringify(postUser), jwtSecret);
          res.status(201).json({ status: true, token, data: postUser });
        }
      });
    } catch (err) {
      res.status(500).json({
        status: false,
        msg: "Hubo un error. No se creo ningun usuario",
        error: err.message
      });
    }
  },

  signIn: async (req, res) => {
    try {
      const { email, password } = req.body;
      const userFound = await userModel.findOne(
        { email },
        { courses: 0, purchases: 0, favorites: 0 }
      );
      if (!userFound)
        return res
          .status(202)
          .json({ status: false, msg: "Usuario no registrado" });
      const isCorrectPassword = await comparePassword(
        password,
        userFound.password
      );
      if (!isCorrectPassword)
        return res
          .status(202)
          .json({ status: false, msg: "Password incorrecto" });
      const token = jwt.sign(JSON.stringify(userFound), jwtSecret);
      res.status(200).json({ status: true, token, id: userFound._id });
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
      const { email, password } = req.body;
      const teacherFound = await teacherModel.findOne(
        { email },
        { courses: 0, image: 0 }
      );
      if (!teacherFound)
        return res
          .status(202)
          .json({ status: false, msg: "Profesor no registrado" });
      const isCorrectPassword = await comparePassword(
        password,
        teacherFound.password
      );
      if (!isCorrectPassword)
        return res
          .status(202)
          .json({ status: false, msg: "Password incorrecto" });
      const token = jwt.sign(JSON.stringify(teacherFound), jwtSecret);
      res.status(200).json({ status: true, token, id: teacherFound._id });
    } catch (err) {
      res.status(500).json({
        status: false,
        msg: "Ocurrio un error al intentar logearse",
        error: err.message
      });
    }
  }
};
