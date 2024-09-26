const { response } = require("express");
const bcryptjs = require("bcryptjs");

const {User} = require('../models');

const {generateJWT} = require('../helpers/generate-jwt');
const {googleVerify} = require('../helpers/google-verify')


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
        res.status(500).json({
            msg: 'Error inesperado'

        })
    }


}

const googleSingIn = async (req, res = Response) => {
    
    const {id_token} = req.body;

    try {
        const {name, img, email} = await googleVerify(id_token)

        let user = await User.findOne({email});

        if (!user) {
            //Si el usuario no existe hay que crearlo
            const data = {
                name,
                email,
                password: ':p',
                img,
                google: true
            };

            user = new User(data);
            await user.save();


        }

        //Se ha eliminaddo al usuario de la base de datos previamente
        if (!user.statusUser) {
            return res.status(401).json({
                msg: 'Usuario bloqueado, estado:false'
            })
        }

        //Generar en JWT
        const token = await generateJWT( user.id );



        res.json({
            msg: 'Login google',
            user,
            token
               
        });

    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: 'El token no se pudo verificar'
        })

    }


    

  
};  

module.exports = {
    login,
    googleSingIn
};