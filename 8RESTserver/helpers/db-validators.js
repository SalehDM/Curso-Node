const Role = require("../models/role.models");
const User = require("../models/user.models");

const validRole = async (role = "") => {
  const roleExists = await Role.findOne({ role });
  if (!roleExists) {
    throw new Error(`El rol ${role} no está en la base de datos`);
  }
};

const validEmail = async (email = "") => {
  const emailExists = await User.findOne({ email });
  if (emailExist) {
    throw new Error(`El email: ${email} ya está egistrado`);
  }
};

module.exports = {
  validRole,
  validEmail,
};
