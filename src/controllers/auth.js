const jwt = require("jsonwebtoken");
const { comparePassword, encryptPassword } = require("../helpers/bcrypt");
const { jwtSecret } = require("../config");
const { userModel, teacherModel } = require("../models");

module.exports = {
  signUp: async (req, res) => {
    try {
      const { name, dni, email, password } = req.body;
      const encryptedPassword = await encryptPassword(password);
      const newUser = new userModel({
        name,
        email,
        dni,
        password: encryptedPassword
      });
      /*  await newUser.save();
      const token = jwt.sign(JSON.stringify(newUser), jwtSecret);
      res.status(201).json({ status: true, token, id: newUser }); */
      newUser.save((err, postUser) => {
        if (err)
          return res.status(500).json({
            status: false,
            msg:
              "No se creo ningun usuario, el email ya existe o falta algun campo",
            err: err.message
          });
        else {
          const token = jwt.sign(JSON.stringify(newUser), jwtSecret);
          return res.status(201).json({ status: true, token, id: newUser._id });
        }
      });
    } catch (err) {
      return res.status(500).json({
        status: false,
        msg: "Ocurrio un error. No se creo ningun usuario",
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
      return res.status(200).json({ status: true, token, id: userFound._id });
    } catch (err) {
      return res.status(500).json({
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
      return res
        .status(200)
        .json({ status: true, token, id: teacherFound._id });
    } catch (err) {
      return res.status(500).json({
        status: false,
        msg: "Ocurrio un error al intentar logearse",
        error: err.message
      });
    }
  }
};
