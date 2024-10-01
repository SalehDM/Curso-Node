const { User, Category, Role, Product } = require('../models');

const validRole = async (role = '') => {
    const roleExists = await Role.findOne({ role });
    if (!roleExists) {
        throw new Error(`El rol ${role} no está en la base de datos`);
    }
};

const validEmail = async (email = '') => {
    const emailExists = await User.findOne({ email });
    if (emailExists) {
        throw new Error(`El email: ${email} ya está registrado`);
    }
};

const validId = async (id) => {
    const idExists = await User.findById(id);
    if (!idExists) {
        throw new Error(`El id: ${id} no se encuentra en la base de datos`);
    }
};

const validIdCategory = async (id) => {
    const idCategoryExists = await Category.findById(id);
    if (!idCategoryExists) {
        throw new Error(`El id: ${id} no se encuentra en la base de datos`);
    }
};
const validIdProduct = async (id) => {
    const idProductExists = await Product.findById(id);
    if (!idProductExists) {
        throw new Error(`El id: ${id} no se encuentra en la base de datos`);
    }
};

//validar colecciones permitidas para cargar archivos
const allowedCollections = (collection = '', collections = []) => {
    if (!collections.includes(collection)) {
        throw new Error(`La colección ${collection} no se encuentra en la coleccion permitida, ${collections}`);
    }

    return true;
};

module.exports = {
    validRole,
    validEmail,
    validId,
    validIdCategory,
    validIdProduct,
    allowedCollections,
};
