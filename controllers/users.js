const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

//* Model
const User = require('../models/users');

//* Helpers
const { generarJWT } = require('../helpers/jwt');


/**
 * GET Users
 */
const usersGet = async(req = request, res = response) => {

  const users = await User.find();

  res.json({
    msg: 'success',
    users
  });

}

/**
 * POST User
 */
const userPost = async(req, res = response) => {
    
  const { name, email, password } = req.body;
  const usuario = new User({ name, email, password });

  // Encriptar la contraseña
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync( password, salt );

  // Guardar en BD
  await usuario.save();

  // Generar el JWT
  const token = await generarJWT( usuario.id, name );

  res.status(201).json({
    ok: true,
    msg: 'created',
    usuario,
    token
  });
}

/**
 * PUT User
 */
const usersPut = async(req, res = response) => {

  const { id } = req.params;
  const { _id, password, email, ...resto } = req.body;

  if ( password ) {
    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync( password, salt );
  }

  await User.findByIdAndUpdate( id, resto );

  res.json({
    msd: 'success',
    usario: resto
  });
}

/**
 * DELETE User
 */
const usersDelete = async(req, res = response) => {

  const { id } = req.params;

  // Fisicamente lo borramos
  const usuario = await User.findByIdAndDelete( id );

  res.json(usuario);
}

module.exports = {
  usersGet,
  userPost,
  usersPut,
  usersDelete,
}