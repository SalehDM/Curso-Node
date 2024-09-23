const { Router } = require("express");
const { check } = require("express-validator");

const { validateValues } = require("../middlewares/validate-values");

const { login } = require('../controls/auth.controls');

const router = Router();

router.post("/login", [
    check("email", "El correo es obligatorio").isEmail(),
    check("password", "La contraseña es obligatoria").not().isEmpty(),

    validateValues
], login);





module.exports = router;