

const validateValues = require("../middlewares/validate-values");
const validateJWT = require("../middlewares/validate-jwt");
const validateRole = require("../middlewares/validate-role");



module.exports = {
    ...validateValues,
    ...validateJWT,
    ...validateRole

}
