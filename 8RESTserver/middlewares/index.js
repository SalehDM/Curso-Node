

const validateValues = require("../middlewares/validate-values");
const validateJWT = require("../middlewares/validate-jwt");
const validateRole = require("../middlewares/validate-role");
const validateFile = require("../middlewares/validate-file");




module.exports = {
    ...validateValues,
    ...validateJWT,
    ...validateRole,
    ...validateFile

}
