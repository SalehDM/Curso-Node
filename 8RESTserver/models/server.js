const express = require('express');
const cors = require('cors'); //Para controlar los accesos al servidor
const fileUpload = require('express-fileupload');

const { dbConnection } = require('../database/config');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.path = {
            auth: '/api/auth',
            categories: '/api/categories',
            products: '/api/products',
            search: '/api/search',
            users: '/api/users',
            uploads: '/api/uploads',
        };

        //Conectar a base de datos

        this.connectDB();

        //Middlewares
        this.middlewares();

        //Rutas de mi aplicación
        this.routes();
    }

    async connectDB() {
        await dbConnection();
    }

    middlewares() {
        //CORS
        this.app.use(cors());

        //Lectura y parseo del body
        this.app.use(express.json());

        //Directorio público
        this.app.use(express.static('public'));

        //Carga de archivos
        this.app.use(
            fileUpload({
                useTempFiles: true,
                tempFileDir: '/tmp/',
                createParentPath: true,
            })
        );
    }

    routes() {
        this.app.use(this.path.auth, require('../routes/auth'));
        this.app.use(this.path.categories, require('../routes/categories'));
        this.app.use(this.path.products, require('../routes/products'));
        this.app.use(this.path.search, require('../routes/search'));
        this.app.use(this.path.users, require('../routes/user'));
        this.app.use(this.path.uploads, require('../routes/uploads'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server in port', this.port);
        });
    }
}

module.exports = Server;
