const { response } = require("express");
const {Product} = require('../models')

const productsGet = async (req, res = response) => {
    const { limitShow = 5, fromStart = 0 } = req.query;
    const myQuery = {statusProduct: true};

    const [total, products] = await Promise.all([
        Product.countDocuments(myQuery),
        Product.find(myQuery)
            .populate('user', 'name')
            .populate('category', 'name')
            .skip(+(fromStart))
            .limit(+(limitShow))
    ])
    

    res.json({
        msg: "get API productos - Controlador",
        total,
        products
    });

}

const productGet = async (req, res = response) => {
    const {id} = req.params;
    const product = await Product.findById(id)
                            .populate('user', 'name')
                            .populate('category', 'name');
    res.json({
        msg: "get API producto - Controlador",
        product
    });

}

const createProduct = async (req, res = response) => {
    const {statusProduct, user, ...body} = req.body;
    const name = req.body.name.toUpperCase();

    const productDB = await Product.findOne({name});
    if (productDB) {
        return res.status(400).json({
            msg: `El producto ${productDB.name}, ya existe`
        })
    }

    //Generar la data a guardar
    const data = {
        ...body,
        name,
        user: req.userAdmin._id,
    }

    const product = new Product(data);

    //Guardar en DB
    await product.save();

    res.status(201).json({product})

}

const productPut = async (req, res = response) => {
    const {id} = req.params;
    const {statusProduct, user, ...data} = req.body;

    if (data.name) {
        data.name = data.name.toUpperCase();
    }
    
    data.user = req.userAdmin._id;

    const product = await Product.findByIdAndUpdate(id, data, {new: true});

    res.json(product);

}

const productDelete = async (req, res = Response) => {
    const {id} = req.params;
    const productDelete = await Product.findById(id);
    if (!productDelete.statusProduct) {
        return res.status(401).json({
            msg: 'ID no válido - estado de categoría false'
        });
    }

    const product = await Product.findByIdAndUpdate(id, {statusProduct: false});

    res.json(product);

}


module.exports = {
    productsGet,
    productGet,
    createProduct,
    productPut,
    productDelete
}