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
  if (emailExists) {
    throw new Error(`El email: ${email} ya está egistrado`);
  }
};

const validId = async (id) => {
  const idExists = await User.findById(id);
  if (!idExists) {
    throw new Error(`El id: ${id} no se encuentra en la base de datos`);
  }
};

module.exports = {
  validRole,
  validEmail,
  validId
};
