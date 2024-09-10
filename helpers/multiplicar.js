const fs = require('fs');

const crearArchivo = async (base=5, listar, hasta) => {
    try {
        let tabla = '';
        for (let i =1; i<=hasta; i++) {
            tabla += `${base} x ${i} = ${base*i}\n`;
        }
        if (listar) {
            console.log(tabla)
        }

        fs.writeFileSync(`./salida/tabla-${base}.txt`,tabla);

        return `tabla-${base}.txt`
    } catch (err) {
        throw err;
    }
}

module.exports = {
    crearArchivo
}
