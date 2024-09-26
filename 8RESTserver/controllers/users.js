const { response } = require("express");
const bcryptjs = require("bcryptjs");

const {User} = require("../models");

const userGet = async (req, res = Response) => {
  const { limitShow = 5, fromStart = 0 } = req.query;
  const myQuery = {statusUser: true};

  const [total, users] = await Promise.all([
    User.countDocuments(myQuery),
    User.find({statusUser: true})
    .skip(+(fromStart))
    .limit(+(limitShow))
  ])
  

  res.json({
    msg: "get API - Controlador",
    total,
    users
  });
};

const userPost = async (req, res = Response) => {
  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role });

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
const userPut = async(req, res = Response) => {
  const {id} = req.params;
  const {_id, password, google, email, ...rest} = req.body;

  //Encriptar contraseña y actualizar la base de datos
  if (password) {
    //Encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    rest.password = bcryptjs.hashSync(password, salt);
  }


  const user = await User.findByIdAndUpdate(id, rest, {new: true});


  res.json(user);
};

const userDelete = async (req, res = Response) => {
  
  const {id} = req.params;
  const userDelete = await User.findById(id);
  if (!userDelete.statusUser) {
    return res.status(401).json({
        msg: 'ID no válido - estado de usuario false'
    });
  }


  //Borrado físico
  //const user = await User.findByIdAndDelete(id);

  //Cambiar estado del usuario
  const user = await User.findByIdAndUpdate(id, {statusUser: false});
  const userAdmin = req.userAdmin;


  res.json({
    msg: "delete API - Controlador",
    user,
    userAdmin
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
