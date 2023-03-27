const { Router } = require('express');
const { check } = require('express-validator');

//* Controllers
const { loginUser, revalidarToken } = require('../controllers/auth');

//* Middlewares
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

//* Login de usuario
router.post( '/', [
  check('email', 'El email es obligatorio').isEmail(),
  check('password', 'La contraseña es obligatoria').isLength({ min: 6 }),
  validarCampos
], loginUser );

//* Validar y revalidar token
router.get( '/renew', validarJWT , revalidarToken );


module.exports = router;