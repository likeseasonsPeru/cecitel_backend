const { userModel } = require("../models");
const { removeImage } = require("../utils");

module.exports = {
  getAllPurchases: async (req, res) => {
    const users = await userModel.find({}).select("purchases _id");
    return res.json(users);
  },

  getDisapproved: async (req, res) => {
    /* const users = await userModel
      .find({ "purchases.approved": true })
      .select("purchases _id"); */
    const users = await userModel
      .find({ "purchases.approved": true })
      .distinct("purchases");
    return res.json(users);
  },

  createOne: async (req, res) => {
    try {
      let user = await userModel.findById(req.params.id);
      if (user) {
        user.purchases.push(req.body);
        await user.save();
        return res.status(201).json({
          status: true,
          msg: "Agregado correctamente",
          data: user
        });
      } else
        return res
          .status(202)
          .json({ status: false, msg: "No se encontro usuario con este id" });
    } catch (err) {
      return res.status(500).json({
        status: false,
        msg: "Ocurrio un error",
        err: err.message
      });
    }
  },

  updateOne: async (req, res) => {
    const { approved } = req.body;
    let updateQuery = {};
    if (approved !== null)
      Object.assign(updateQuery, { "purchases.$.approved": approved });
    if (req.file_names)
      Object.assign(updateQuery, {
        "purchases.$.image": req.file_names[0]
      });
    userModel.findOneAndUpdate(
      { "purchases._id": req.params.id },
      updateQuery,
      (err, post) => {
        if (err)
          return res.status(500).json({
            status: false,
            msg: "Ocurrio un error",
            err: err.message
          });
        else {
          try {
            if (post && req.file_names) {
              let i = post.purchases.findIndex(p => p._id == req.params.id);
              i !== -1 && removeImage(post.purchases[i].image);
            }
            return res.status(200).json({
              status: true,
              msg: "Modificado correctamente",
              data: post
            });
          } catch (err) {
            console.log(err);
            return res.status(500).json({
              status: false,
              msg: "Ocurrio un error",
              err: err.message
            });
          }
        }
      }
    );
  },

  deleteOneByPurchaseId: (req, res) => {
    userModel.findOneAndUpdate(
      { "purchases._id": req.params.id },
      {
        $pull: { purchases: { _id: req.params.id } }
      },
      (err, post) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            status: false,
            msg: "Ocurrio un error",
            err: err.message
          });
        } else {
          if (post) {
            let i = post.purchases.findIndex(p => p._id == req.params.id);
            i !== -1 && removeImage(post.purchases[i].image);
          }
          return res.status(200).json({
            status: true,
            msg: "Eliminado correctamente"
          });
        }
      }
    );
  }
};
