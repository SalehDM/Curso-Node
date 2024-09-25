const { Router } = require("express");
const { check } = require("express-validator");

const { validateValues } = require("../middlewares/validate-values");

const router = Router();


router.get('/', (req, res) => {
    console.log('Consulta de categorias')
})





module.exports = router;