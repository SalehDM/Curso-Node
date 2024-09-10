const {crearArchivo} = require('./helpers/multiplicar');
const argv = require('./config/yargs');

console.clear()
//node app.js -b 3 -h 10 -l

crearArchivo (argv.b, argv.l, argv.h)
    .then(nombreArchivo => console.log(nombreArchivo, 'creado'))
    .catch (err => console.log(err));