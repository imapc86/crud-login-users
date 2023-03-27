const { Router } = require('express');
const { check } = require('express-validator');

//* Controllers
const { usersGet, userPost, usersPut, usersDelete } = require('../controllers/users');

//* Middlewares
const { validarCampos } = require('../middlewares/validar-campos');

//* Helpers
const { emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');

const router = Router();


/*******************************
 ** Routes
 *******************************/
router.get('/', usersGet );

router.post('/', [
  check('name', 'El nombre es obligatorio').not().isEmpty(),
  check('password', 'El password debe de ser más de 6 letras').isLength({ min: 6 }),
  check('email', 'El correo no es válido').isEmail(),
  check('email').custom( emailExiste ),
  validarCampos
], userPost );

router.put('/:id',[
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom( existeUsuarioPorId ),
  validarCampos
],usersPut );

router.delete('/:id',[
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom( existeUsuarioPorId ),
  validarCampos
],usersDelete );


module.exports = router;