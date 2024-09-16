const fs = require("fs");

const file = "./db/list.json";

const saveData = async (data) => {
  fs.writeFileSync(file, JSON.stringify(data));
};

const readList = () => {
  return fs.existsSync(file)
    ? JSON.parse(fs.readFileSync(file, { encoding: "utf-8" }))
    : null;
};

module.exports = {
  saveData,
  readList,
};
