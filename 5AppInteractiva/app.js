const { saveData, readList } = require("./helpers/file");

const {
  inquirerMenu,
  stop,
  addData,
  inquirerDelete,
  confirmation,
  inquirerOk,
} = require("./helpers/inquirer");

const Tasks = require("./models/tasks");

const main = async () => {
  let option = "";
  const tasks = new Tasks();

  do {
    console.clear();

    option = await inquirerMenu();

    switch (option) {
      case 1:
        const newTask = await addData();
        tasks.loadTasks(readList());
        tasks.createTask(newTask);
        saveData(tasks.listArray);
        break;
      case 2:
        tasks.summary(readList());
        break;
      case 3:
        tasks.tasksStatus(readList(), "complete");
        break;
      case 4:
        tasks.tasksStatus(readList(), "pending");
        break;
      case 5:
        const choicesListOk = tasks.allTasks(readList());
        const okList = await inquirerOk(choicesListOk);
        if (!okList.includes(0)) {
          const newList = tasks.okTasks(readList(), okList);
          saveData(newList);
        }
        break;
      case 6:
        const choicesList = tasks.allDeleteTasks(readList());
        const deleteList = await inquirerDelete(choicesList);
        if (!(deleteList == false || deleteList.includes(0))) {
          const resultConfirmation = await confirmation();
          if (resultConfirmation) {
            const newList = tasks.deleteTasks(readList(), deleteList);
            saveData(newList);
          }
        }
        break;
    }

    console.log("\n");
    await stop();
  } while (option !== 0);
};

main();
