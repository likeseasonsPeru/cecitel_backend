const bcrypt = require("bcrypt");
const { saltRouds } = require("../config");

async function getSalt () {
  return await bcrypt.genSaltSync(+saltRouds);
};

async function encryptPassword (password) {
  const salt = await getSalt();
  return await bcrypt.hashSync(password, salt);
};

async function comparePassword (passwordFromClient, encryptedPassword) {
  return await bcrypt.compareSync(passwordFromClient, encryptedPassword);
};

module.exports = { encryptPassword, comparePassword };
