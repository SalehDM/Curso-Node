const { response } = require('express');


const userGet = (req, res = Response) => {
    const {q, name='No name', apikey} = req.query;
    res.json({
       msg: 'get API - Controlador',
       q,
       name,
       apikey 
    });

}
const userPost = (req, res = Response) => {
    const {name, age} = req.body;
    res.json({
       msg: 'post API - Controlador',
       name, 
       age

    });

}
const userPut = (req, res = Response) => {
    const id = req.params.id;
    res.json({
       msg: 'put API - Controlador',
       id 
    });

}


const userDelete = (req, res = Response) => {
    res.json({
       msg: 'delete API - Controlador' 
    });

}

const userPatch = (req, res = Response) => {
    res.json({
       msg: 'patch API - Controlador' 
    });

}

module.exports = {

    userGet,
    userPut,
    userPost,
    userDelete,
    userPatch
}