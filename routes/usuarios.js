/*
    Ruta: /api/usuarios

*/

const { Router } = require('express');
const { check } = require('express-validator');

const { getUsuarios, crearUsuario } = require('../controllers/usuarios');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.get( '/', getUsuarios );
router.post( '/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El es password obligatorio').not().isEmpty(),
    check('email', 'El es email obligatorio').isEmail(),
    validarCampos
], crearUsuario );


module.exports = router;