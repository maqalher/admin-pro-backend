/**
 * Path: /api/login
 */
const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSingIn } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post('/', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligtorio').not().isEmpty(),
    validarCampos
], login);

router.post('/google', [
    check('token', 'El token de google es obligtorio').not().isEmpty(),
    googleSingIn
], login);



module.exports = router;
