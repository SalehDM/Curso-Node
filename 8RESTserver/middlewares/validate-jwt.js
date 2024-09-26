const {request, response} = require('express');
const jwt = require('jsonwebtoken');

const {User} = require("../models");

const validateJWT = async (req = request, res = response, next) => {
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }
    
    try {
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        //Leer usuario administrador
        const userAdmin = await User.findById(uid);
        req.userAdmin = userAdmin;

        if (!userAdmin) {
            return res.status(401).json({
                msg: 'token no válido - usuario no encontrado en la base de datos'
            });
        }


        //Verificar si el id tiene estado true
        if (!userAdmin.statusUser) {
            return res.status(401).json({
                msg: 'token no válido - estado de usuario false'
            });
        }
        next();
        
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no válido'
        })
    }

}



module.exports = {
    validateJWT
}