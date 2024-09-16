const { select, input, checkbox, confirm } = require("@inquirer/prompts");

const messageSelect = "+Seleccione una opción+";
const choicesSelect = [
  {
    name: "1. Crear tarea",
    value: 1,
    description: "-",
  },
  {
    name: "2. Listar tareas",
    value: 2,
    description: "-",
  },
  {
    name: "3. Listar tareas completadas",
    value: 3,
    description: "-",
  },
  {
    name: "4. Listar tareas pendientes",
    value: 4,
    description: "-",
  },
  {
    name: "5. Completar tarea(s)",
    value: 5,
    description: "-",
  },
  {
    name: "6. Borrar tarea",
    value: 6,
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
  console.log("+++MENÚ DE TAREAS+++");
  return select({
    message: messageSelect,
    choices: choicesSelect,
  });
};

const stop = async () =>
  await input({ message: "Presione ENTER para continuar." });

const addData = async () =>
  await input({ message: "Descripción: ", required: true });

const inquirerDelete = async (choicesDelete) => {
  console.clear();
  return checkbox({
    message: "Seleccione la(s) tarea(s) a eliminar",
    choices: choicesDelete,
  });
};

const confirmation = async () =>
  confirm({ message: "Confirma que desea eliminar la(s) tarea(s)" });

const inquirerOk = async (allChoices) => {
  console.clear();
  return checkbox({
    message: "Seleccione la(s) tarea(s) completada(s)",
    choices: allChoices,
  });
};

module.exports = {
  inquirerMenu,
  stop,
  addData,
  inquirerDelete,
  confirmation,
  inquirerOk,
};
