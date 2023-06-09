const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../database/config');

class Server {

  constructor() {
    this.app  = express();
    this.port = process.env.PORT;
    this.usersPath = '/api/users';
    this.authPath = '/api/auth';

    // Start database
    this.conectarDB();

    // Middlewares
    this.middlewares();

    // App routes
    this.routes();
  }

  async conectarDB() {
    await dbConnection();
  }

  middlewares() {

    // CORS
    this.app.use( cors() );

    // Lectura y parseo del body
    this.app.use( express.json() );

    // Public folder
    this.app.use( express.static('public') );

  }

  routes() {
    this.app.use( this.usersPath, require('../routes/users'));
   this.app.use( this.authPath, require('../routes/auth') );
  }

  listen() {
    this.app.listen( this.port, () => {
      console.log('Servidor corriendo en el puerto: ', this.port );
    });
  }

}

module.exports = Server;