const { response } = require("express");
const bcryptjs = require("bcryptjs");

const User = require('../models/user.models');

const {generateJWT} = require('../helpers/generate-jwt')


const login = async (req, res = Response) => {
    const { email, password } = req.body;

    try {
        //verificar si el email existe
        const user = await User.findOne({ email });
        if ( !user ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - correo'
            })
        }

        //verificar si el usuario está activo
        if ( !user.statusUser ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - estado del usuario'
            })
        }

        //Verificar contraseña
        const validPassword = bcryptjs.compareSync( password, user.password );
        if ( !validPassword ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - contraseña'
            })
        }

        //Generar en JWT
        const token = await generateJWT( user.id );



        res.json({
            msg: 'Login ok',
            user,
            token
          });


    } catch (error) {
        console.log(error);
        resizeTo.status(500).json({
            msg: 'Error inesperado'

        })
    }







    
  };

  module.exports = {
    login
  };