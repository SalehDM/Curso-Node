const { response } = require("express");
const Category = require('../models/categories.models')

const categoriesGet = async (req, res = response) => {
    const { limitShow = 5, fromStart = 0 } = req.query;
    const myQuery = {statusCategory: true};

    const [total, categories] = await Promise.all([
        Category.countDocuments(myQuery),
        Category.find({statusCategory: true})
        .populate('user', 'name')
        .skip(+(fromStart))
        .limit(+(limitShow))
    ])
    

    res.json({
        msg: "get API categorías - Controlador",
        total,
        categories
    });

}

const categoryGet = async (req, res = response) => {
    const {id} = req.params;
    const category = await Category.findById(id).populate('user', 'name');
    res.json({
        msg: "get API categoría - Controlador",
        category
    });

}
 
const crateCategory = async (req, res = response) => {
    const name = req.body.name.toUpperCase();

    const categoryDB = await Category.findOne({name});
    if (categoryDB) {
        return res.status(400).json({
            msg: `La categoría ${categoryDB.name}, ya existe`
        })
    }

    //Generar la data a guardar
    const data = {
        name,
        user: req.userAdmin._id
    }

    const category = new Category(data);

    //Guardar en DB
    await category.save();

    res.status(201).json({category})

}

const categoryPut = async (req, res = response) => {
    const {id} = req.params;
    const {statusCategory, user, ...data} = req.body;

    data.name = data.name.toUpperCase();
    data.user = req.userAdmin._id;

    const category = await Category.findByIdAndUpdate(id, data, {new: true});

    res.json(category);

}

const categoryDelete = async (req, res = Response) => {
    const {id} = req.params;
    const categoryDelete = await Category.findById(id);
    if (!categoryDelete.statusCategory) {
        return res.status(401).json({
            msg: 'ID no válido - estado de categoría false'
        });
    }

    const category = await Category.findByIdAndUpdate(id, {statusCategory: false});

    res.json(category);

}


module.exports = {
    crateCategory,
    categoriesGet,
    categoryGet,
    categoryPut,
    categoryDelete
}