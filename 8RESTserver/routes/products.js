const { Router } = require('express');
const { check } = require('express-validator');

const { productsGet, productGet, createProduct, productPut, productDelete } = require('../controllers');

const { validateValues, validateJWT, isAdminRole } = require('../middlewares');

const { validIdCategory, validIdProduct } = require('../helpers');

const router = Router();

//Obtener todos los productos - público
router.get('/', productsGet);

//Obtener un producto por id - público
router.get(
    '/:id',
    [check('id', 'No es un ID de mongo válido').isMongoId(), check('id').custom(validIdProduct), validateValues],
    productGet
);

//Crear producto - privado - cualquier persona con un token válido
router.post(
    '/',
    [
        validateJWT,
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('category', 'No es un ID de mongo válido').isMongoId(),
        check('category').custom(validIdCategory),
        validateValues,
    ],
    createProduct
);

//Actualizar producto - privado - cualquier persona con un token válido
router.put('/:id', [validateJWT, check('id').custom(validIdProduct), validateValues], productPut);

//Borrar producto - privado - solo Admin
router.delete(
    '/:id',
    [
        validateJWT,
        isAdminRole,
        check('id', 'No es un ID de mongo válido').isMongoId(),
        check('id').custom(validIdProduct),
        validateValues,
    ],
    productDelete
);

module.exports = router;
