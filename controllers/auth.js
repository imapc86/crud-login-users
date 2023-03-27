const { response } = require('express');
const bcrypt = require('bcryptjs');

//* Modelos
const User = require('../models/users');

//* Helpers
const { generarJWT } = require('../helpers/jwt');


const loginUser = async(req, res = response) => {

  const { email, password } = req.body;

  try {
      
    const dbUser = await User.findOne({ email });

    if(  !dbUser ) {
      return res.status(400).json({
        ok: false,
        msg: 'El correo no existe'
      });
    }

    // Confirmar si el password hace match
    const validPassword = bcrypt.compareSync( password, dbUser.password );

    if ( !validPassword ) {
      return res.status(400).json({
        ok: false,
        msg: 'El password no es válido'
      });
    }

    // Generar el JWT
    const token = await generarJWT( dbUser.id, dbUser.name );

    // Respuesta del servicio
    return res.json({
      ok: true,
      uid: dbUser.id,
      name: dbUser.name,
      email,
      token
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador'
    });
  }

}


const revalidarToken = async(req, res = response ) => {

  const { uid } = req;

  //Leer la base de datos
  const dbUser = await User.findById(uid);

  // Generar el JWT
  const token = await generarJWT( uid, dbUser.name );

  return res.json({
    ok: true,
    uid, 
    name: dbUser.name,
    email: dbUser.email,
    token
  });
}

module.exports = {
  loginUser,
  revalidarToken
}