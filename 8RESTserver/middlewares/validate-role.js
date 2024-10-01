const { response } = require('express');

const isAdminRole = (req, res = response, next) => {
    if (!req.userAdmin) {
        return res.status(500).json({
            msg: 'Se quiere validar el rol antes de validar el token primero',
        });
    }

    const { role, name } = req.userAdmin;

    if (role !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `El usuario ${name} no tiene permisos de administrador`,
        });
    }

    next();
};

const hasRole = (...roles) => {
    return (req, res = response, next) => {
        if (!req.userAdmin) {
            return res.status(500).json({
                msg: 'Se quiere validar el rol antes de validar el token primero',
            });
        }

        if (!roles.includes(req.userAdmin.role)) {
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles: ${roles}`,
            });
        }

        next();
    };
};

module.exports = {
    isAdminRole,
    hasRole,
};
