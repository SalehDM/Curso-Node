const { Router } = require('express');
const { check } = require('express-validator');

const {
    validateValues,
    validateJWT,
    //isAdminRole,
    hasRole,
} = require('../middlewares');

const { validRole, validEmail, validId } = require('../helpers');
const { userGet, userPut, userPost, userDelete, userPatch } = require('../controllers');

const router = Router();

router.get('/', userGet);

router.post(
    '/',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio y debe tener más de 6 caracteres').isLength({ min: 6 }),
        check('email', 'Ese correo no es válido').isEmail(),
        check('email').custom(validEmail),
        //check('role', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
        check('role').custom(validRole), //custom((role) => validRole(role)),
        validateValues,
    ],
    userPost
);

router.put(
    '/:id',
    [
        check('id', 'No es un ID válido').isMongoId(),
        check('id').custom(validId),
        check('role').custom(validRole),
        validateValues,
    ],
    userPut
);

router.delete(
    '/:id',
    [
        validateJWT,
        //isAdminRole,
        hasRole('USER_ROLE', 'ADMIN_ROLE'),
        check('id', 'No es in ID válido').isMongoId(),
        check('id').custom(validId),
        validateValues,
    ],
    userDelete
);

router.patch('/', userPatch);

module.exports = router;
