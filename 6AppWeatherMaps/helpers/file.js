const fs = require("fs");

const file = "./db/cities.json";

const saveCity = async (data) => {
  fs.writeFileSync(file, JSON.stringify(data));
};

const readCities = () => {
  return fs.existsSync(file)
    ? JSON.parse(fs.readFileSync(file, { encoding: "utf-8" }))
    : [];
};

module.exports = {
  saveCity,
  readCities,
};
