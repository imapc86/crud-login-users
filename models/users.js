
const { Schema, model } = require('mongoose');

const UserSchema = Schema({
  name: {
    type: String,
    required: [true, 'El nombre es obligatorio']
  },
  email: {
    type: String,
    required: [true, 'El correo debe ser único'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'La contraseña es obligatoria'],
  }
});


//* Remover atributos del objeto devuelto por el método .toJSON()
UserSchema.methods.toJSON = function() {
  const { __v, password, ...user  } = this.toObject();
  return user;
}

module.exports = model( 'User', UserSchema );
