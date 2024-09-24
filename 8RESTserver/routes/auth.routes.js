const { Router } = require("express");
const { check } = require("express-validator");

const { validateValues } = require("../middlewares/validate-values");

const { login, googleSingIn } = require('../controls/auth.controls');

const router = Router();

router.post("/login", [
    check("email", "El correo es obligatorio").isEmail(),
    check("password", "La contraseña es obligatoria").not().isEmpty(),

    validateValues
], login);

router.post("/google", [
    check("id_token", "El token de google es necesario").not().isEmpty(),
    validateValues
], googleSingIn);





module.exports = router;