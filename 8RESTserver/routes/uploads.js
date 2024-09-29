const { Router } = require('express');
const { check } = require('express-validator');

const { validateValues, validateFile } = require('../middlewares');
const { loadFile, updateImage, showImage } = require('../controllers');
const { allowedCollections } = require('../helpers');

const router = Router();

router.post('/', validateFile, loadFile);

router.put(
    '/:collection/:id',
    [
        validateFile,
        check('id', 'No es un ID de mongo válido').isMongoId(),
        check('collection').custom((c) => allowedCollections(c, ['users', 'products'])),
        validateValues,
    ],
    updateImage
);

router.get(
    '/:collection/:id',
    [
        check('id', 'No es un ID de mongo válido').isMongoId(),
        check('collection').custom((c) => allowedCollections(c, ['users', 'products'])),
        validateValues,
    ],
    showImage
);

module.exports = router;
