require("dotenv").config(); //para las variables de entorno, Ej: PORT

const Server = require("./models/server.models");

const server = new Server();

server.listen();
