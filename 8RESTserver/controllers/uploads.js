const path = require('path');
const fs = require('fs');

const { response } = require('express');

const { uploadFile } = require('../helpers');
const { User, Product } = require('../models');

const loadFile = async (req, res = response) => {
    try {
        //Imágenes
        const newName = await uploadFile(req.files, undefined, 'imgs');

        //txt, md
        //const newName = await uploadFile(req.files, ['txt', 'md'], 'textos');

        res.json({ newName });
    } catch (msg) {
        res.status(400).json({ msg });
    }
};

const updateImage = async (req, res = response) => {
    const { id, collection } = req.params;
    let model;

    switch (collection) {
        case 'users':
            model = await User.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`,
                });
            }
            break;

        case 'products':
            model = await Product.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${id}`,
                });
            }
            break;

        default:
            return res.status(500).json({ msg: 'Se me olvidó validar esto' });
    }

    //Limpiar imágenes previas
    if (model.img) {
        //Hay que borrar la imagen del servidosr
        const pathImagen = path.join(__dirname, '../uploads/', collection, model.img);

        if (fs.existsSync(pathImagen)) {
            fs.unlinkSync(pathImagen);
        }
    }

    const newName = await uploadFile(req.files, undefined, collection);
    model.img = newName;

    await model.save();

    res.json(model);
};

const showImage = async (req, res = response) => {
    const { id, collection } = req.params;
    let model;

    switch (collection) {
        case 'users':
            model = await User.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`,
                });
            }
            break;

        case 'products':
            model = await Product.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${id}`,
                });
            }
            break;

        default:
            return res.status(500).json({ msg: 'Se me olvidó validar esto' });
    }

    //Limpiar imágenes previas
    if (model.img) {
        //Hay que borrar la imagen del servidosr
        const pathImagen = path.join(__dirname, '../uploads', collection, model.img);

        if (fs.existsSync(pathImagen)) {
            return res.sendFile(pathImagen);
        }
    }

    const pathImagen = path.join(__dirname, '../assets/no-image.png');
    res.sendFile(pathImagen);
};

module.exports = {
    loadFile,
    updateImage,
    showImage,
};
