const { Router } = require('express');
const { check } = require('express-validator');

const { crateCategory, categoriesGet, categoryGet, categoryPut, categoryDelete } = require('../controllers');

const { validateValues, validateJWT, isAdminRole } = require('../middlewares');

const { validIdCategory } = require('../helpers');

const router = Router();

//Obtener todas las categorías - público
router.get('/', categoriesGet);

//Obtener una categoría por id - público
router.get(
    '/:id',
    [check('id', 'No es un ID de mongo válido').isMongoId(), check('id').custom(validIdCategory), validateValues],
    categoryGet
);

//Crear categoría - privado - cualquier persona con un token válido
router.post(
    '/',
    [validateJWT, check('name', 'El nombre es obligatorio').not().isEmpty(), validateValues],
    crateCategory
);

//Actualizar categoría - privado - cualquier persona con un token válido
router.put(
    '/:id',
    [
        validateJWT,
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('id').custom(validIdCategory),
        validateValues,
    ],
    categoryPut
);

//Borrar categoría - privado - solo Admin
router.delete(
    '/:id',
    [
        validateJWT,
        isAdminRole,
        check('id', 'No es un ID de mongo válido').isMongoId(),
        check('id').custom(validIdCategory),
        validateValues,
    ],
    categoryDelete
);

module.exports = router;
