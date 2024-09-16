const { createFile } = require("./helpers/multiply");
const argv = require("./config/yargs");

console.clear();
//node app.js -b 3 -h 10 -l

createFile(argv.b, argv.l, argv.h)
  .then((nameFile) => console.log(`La tabla de multiplicar "${nameFile}" ha sido creada`))
  .catch((err) => console.log(err));
