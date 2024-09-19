const express = require('express');
const cors = require('cors'); //Para controlar los accesos al servidor

class Server {
    constructor () {
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';

        
        
        
        
        //Middlewares
        this.middlewares();

        
        //Rutas de mi aplicación
        this.routes();

    }

    middlewares() {

        //CORS
        this.app.use(cors())

        //Lectura y parseo del body
        this.app.use( express.json() );



        //Directorio público
        this.app.use( express.static('public'))
    }

    routes() {
        this.app.use(this.usersPath, require('../routes/user.routes'))

    }


    listen() {
        this.app.listen( this.port, () => {
            console.log('Server in port', this.port );
        });
    }

}



module.exports = Server;


