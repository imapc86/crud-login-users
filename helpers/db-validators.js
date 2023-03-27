const Usuario = require('../models/users');

const emailExiste = async( email = '' ) => {

  // Verificar si el correo existe
  const existeEmail = await Usuario.findOne({ email });
  if ( existeEmail ) {
    throw new Error(`El correo: ${ email }, ya está registrado`);
  }
}

const existeUsuarioPorId = async( id ) => {

  // Verificar si el correo existe
  const existeUsuario = await Usuario.findById(id);
  if ( !existeUsuario ) {
    throw new Error(`El id no existe ${ id }`);
  }
}


module.exports = {
  emailExiste,
  existeUsuarioPorId
}

