const path = require('path');
const { v4: uuidv4 } = require('uuid');

const uploadFile = (files, validExtensions = ['png', 'jpg', 'jpeg', 'gif'], folder='') => {

    return new Promise((resolve, reject) => {

        const {file} = files;
        const cutName = file.name.split('.');
        const extension = cutName[cutName.length-1];
    
        //Validar la extensión
        if (!validExtensions.includes(extension)) {
            return reject(`La extensión ${extension} no es permitida, debe ser una de estas extensiones ${validExtensions}`)
        }
    
        const nameInDB = uuidv4() + '.' + extension;
    
        const uploadPath = path.join(__dirname, '../uploads/', folder, nameInDB);
    
        file.mv(uploadPath, (err) => {
            if (err) {
                return reject(err);
            }
    
            resolve(nameInDB);
        });

    })

   


}

module.exports = {
    uploadFile
}

