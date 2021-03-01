const jwt = require("jsonwebtoken");
const { sendMail, bcryptHelpers } = require("../helpers");
const { comparePassword, encryptPassword } = bcryptHelpers;
const { jwtSecret } = require("../config");
const { userModel, teacherModel, hashModel } = require("../models");

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
        msg: "Ocurrio un error",
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
          .status(422)
          .json({ status: false, msg: "Usuario no registrado" });
      const isCorrectPassword = await comparePassword(
        password,
        userFound.password
      );
      if (!isCorrectPassword)
        return res
          .status(422)
          .json({ status: false, msg: "Password incorrecto" });
      const token = jwt.sign(JSON.stringify(userFound), jwtSecret);
      return res.status(200).json({ status: true, token, id: userFound._id });
    } catch (err) {
      return res.status(500).json({
        status: false,
        msg: "Ocurrio un error",
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
          .status(422)
          .json({ status: false, msg: "Profesor no registrado" });
      const isCorrectPassword = await comparePassword(
        password,
        teacherFound.password
      );
      if (!isCorrectPassword)
        return res
          .status(422)
          .json({ status: false, msg: "Password incorrecto" });
      const token = jwt.sign(JSON.stringify(teacherFound), jwtSecret);
      return res
        .status(200)
        .json({ status: true, token, id: teacherFound._id });
    } catch (err) {
      return res.status(500).json({
        status: false,
        msg: "Ocurrio un error",
        error: err.message
      });
    }
  },

  sendResetPasswordLink: async (req, res) => {
    const { email } = req.body;
    try {
      const user = await userModel.findOne({ email });
      if (!user)
        return res
          .status(422)
          .json({ status: false, msg: "No existe usuario con este email" });

      const hasHash = await hashModel.findOne({ userId: user._id });
      hasHash && (await hasHash.remove());
      const hash = new hashModel({ userId: user._id });

      // sendMail
      const objeto = {...user._doc, ...{hash: hash._id}}
      sendMail(objeto, "forgot-password-email");
      await hash.save();
      return res.status(200).json({ status: true, msg: "Correo enviado" });
    } catch (err) {
      return res.status(500).json({
        status: false,
        msg: "Ocurrio un error",
        error: err.message
      });
    }
  },

  changePassword: async (req, res) => {
    const { hash, password } = req.body;
    try {
      const hasHash = await hashModel.findById(hash);
      if (!hasHash)
        return res.status(422).json({
          status: false,
          msg: "No se puede resetear el password con este hash"
        });
      const user = await userModel.findById(hasHash.userId);
      if (!user)
        return res.status(422).json({
          status: false,
          msg: "No se puede resetear el password con este hash"
        });
      const encryptedPassword = await encryptPassword(password);
      user.password = encryptedPassword;
      await user.save();
      await hasHash.remove();
      return res.status(200).json({
        status: true,
        msg: "Modificado correctamente"
      });
    } catch (err) {
      return res.status(500).json({
        status: false,
        msg: "Ocurrio un error",
        error: err.message
      });
    }
  }
};
