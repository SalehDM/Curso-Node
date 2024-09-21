const { Router } = require("express");
const { check } = require("express-validator");

const { validateValues } = require("../middlewares/validate-values");
const { validRole, validEmail } = require("../helpers/db-validators");
const {
  userGet,
  userPut,
  userPost,
  userDelete,
  userPatch,
} = require("../controls/users.controls");

const router = Router();

router.get("/", userGet);

router.post(
  "/",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check(
      "password",
      "El password es obligatorio y debe tener más de 6 caracteres"
    ).isLength({ min: 6 }),
    check("email", "Ese correo no es válido").isEmail(),
    check("email").custom(validEmail),
    //check('role', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check("role").custom(validRole), //custom((role) => validRole(role)),
    validateValues,
  ],
  userPost
);

router.put("/:id", userPut);

router.delete("/", userDelete);

router.patch("/", userPatch);

module.exports = router;
