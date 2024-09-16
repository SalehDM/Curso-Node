const Task = require("./task");

class Tasks {
  constructor() {
    this._list = {};
  }

  get listArray() {
    const _listArray = [];
    Object.keys(this._list).forEach((key) => {
      _listArray.push(this._list[key]);
    });

    return _listArray;
  }

  createTask(description = "") {
    const task = new Task(description);
    this._list[task.id] = task;
  }

  loadTasks(tasks = []) {
    tasks.forEach((task) => {
      this._list[task.id] = task;
    });
  }

  summary(readTasks) {
    return readTasks.forEach((task, index) => {
      console.log(
        `${index + 1}. ${task["description"]} :: ${
          task["finishDate"] ? "Completada" : "Pendiente"
        }`
      );
    });
  }

  tasksStatus(readTasks, option) {
    let complete = [];
    let pending = [];
    readTasks.forEach((task) => {
      task["finishDate"] ? complete.push(task) : pending.push(task);
    });

    if (option == "complete") {
      return complete.forEach((task, index) => {
        console.log(
          `${index + 1}. ${task["description"]} :: ${task["finishDate"]}`
        );
      });
    }
    if (option == "pending") {
      return pending.forEach((task, index) => {
        console.log(`${index + 1}. ${task["description"]}`);
      });
    }
  }

  allDeleteTasks(readTasks) {
    const choices = [{ name: "Cancelar", value: 0 }];
    readTasks.forEach((task) =>
      choices.push({ name: task["description"], value: task["id"] })
    );
    return choices;
  }

  deleteTasks(data, tasks) {
    let listTasks = [];

    for (let i = 0; i < data.length; i++) {
      if (!tasks.includes(data[i]["id"])) {
        listTasks.push(data[i]);
      }
    }
    return listTasks;
  }

  allTasks(readTasks) {
    const choices = [{ name: "Cancelar", value: 0, checked: false }];
    readTasks.forEach((task) =>
      choices.push({
        name: task["description"],
        value: task["id"],
        checked: task["finishDate"] ?? false,
      })
    );
    return choices;
  }

  okTasks(data, tasks) {
    let listOk = [];
    data.forEach((task) => {
      if (tasks.includes(task["id"])) {
        if (task["finishDate"] == null) {
          task["finishDate"] = new Date().toISOString();
          listOk.push(task);
        } else {
          listOk.push(task);
        }
      } else {
        task["finishDate"] = null;
        listOk.push(task);
      }
    });
    return listOk;
  }
}

module.exports = Tasks;
