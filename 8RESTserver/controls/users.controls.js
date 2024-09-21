const { response } = require("express");
const bcryptjs = require("bcryptjs");

const User = require("../models/user.models");

const userGet = (req, res = Response) => {
  const { q, name = "No name", apikey } = req.query;
  res.json({
    msg: "get API - Controlador",
    q,
    name,
    apikey,
  });
};
const userPost = async (req, res = Response) => {
  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role });

  //Verificar si el correo existe

  //Encriptar contraseña
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  //Guardar en base de datos
  await user.save();
  //Se devuelve al usuario lo grabado
  res.json({
    //msg: 'post API - Controlador',
    user,
  });
};
const userPut = (req, res = Response) => {
  const id = req.params.id;
  res.json({
    msg: "put API - Controlador",
    id,
  });
};

const userDelete = (req, res = Response) => {
  res.json({
    msg: "delete API - Controlador",
  });
};

const userPatch = (req, res = Response) => {
  res.json({
    msg: "patch API - Controlador",
  });
};

module.exports = {
  userGet,
  userPut,
  userPost,
  userDelete,
  userPatch,
};
