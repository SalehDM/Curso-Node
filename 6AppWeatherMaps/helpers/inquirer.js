const { select, input, checkbox, confirm } = require("@inquirer/prompts");

const messageSelect = "+Seleccione una opción+";
const choicesSelect = [
  {
    name: "1. Buscar ciudad",
    value: 1,
    description: "-",
  },
  {
    name: "2. Historial",
    value: 2,
    description: "-",
  },
  {
    name: "0. Salir \n",
    value: 0,
    description: "-",
  },
];

const inquirerMenu = async () => {
  console.clear();
  console.log("+++MENÚ+++");
  return select({
    message: messageSelect,
    choices: choicesSelect,
  });
};

const stop = async () =>
  await input({ message: "Presione ENTER para continuar." });

const addData = async () =>
  await input({ message: "Introduzca una ciudad: ", required: true });

const inquirerCity = async (allChoices) => {
  console.clear();
  return select({
    message: "Seleccione una ciudad",
    choices: allChoices,
  });
};

module.exports = {
  inquirerMenu,
  stop,
  addData,
  inquirerCity,
};
