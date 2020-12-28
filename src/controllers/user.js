const { encryptPassword } = require("../helpers/bcrypt");
const { userModel } = require("../models");
const { removeImage } = require("../utils/index");

module.exports = {
  getAll: async (req, res) => {
    const users = await userModel.find(
      {},
      { courses: 0, purchases: 0, favorites: 0 }
    );
    res.status(200).json({ status: true, data: users });
  },

  getOne: async (req, res) => {
    try {
      const user = await userModel
        .findById(req.params.id)
        .populate({
          path: "courses.course",
          select: "-modules -teacher -_id -createdAt -updatedAt"
        })
        .populate({
          path: "courses.teacher",
          select: "-courses -password -createdAt -updatedAt"
        });
      if (user) return res.json({ status: true, data: user });
      else {
        return res.status(202).json({
          status: false,
          msg: "No se encontro usuario con este id"
        });
      }
    } catch (err) {
      return res.status(500).json({
        status: false,
        msg: "Ocurrio un error",
        err: err.message
      });
    }
  },

  updateOne: async (req, res) => {
    try {
      const user = await userModel.findById(req.params.id);
      if (user) {
        const { name, email, dni, password, category } = req.body;
        const filename = req.file_names;

        if (name) user.name = name;
        if (email) user.email = email;
        if (dni) user.dni = dni;
        if (password) user.password = await encryptPassword(password);
        if (category) user.category = category;
        if (filename) {
          removeImage(user.image);
          user.image = filename[0];
        }

        user.save((err, postUser) => {
          if (err) {
            return res.status(202).json({
              status: false,
              msg: "Ya existe un usuario con este email"
            });
          } else
            return res.status(200).json({
              status: true,
              msg: "Modificado correctamente",
              data: postUser
            });
        });
      } else
        return res.status(202).json({
          status: false,
          msg: "No se encontro usuario con este id"
        });
    } catch (err) {
      return res
        .status(500)
        .json({ status: false, msg: "Ocurrio un error", err: err.message });
    }
  },

  resetPassword: async (req, res) => {}
};
