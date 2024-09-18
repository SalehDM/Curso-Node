
require('dotenv').config(); //para las variables de entorno, Ej: PORT

const Server = require('./models/server');


const server = new Server();

server.listen();







