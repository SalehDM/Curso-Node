require('dotenv').config(); //para las variables de entorno, Ej: PORT

const { Server } = require('./models');

const server = new Server();

server.listen();
