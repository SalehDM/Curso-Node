const fs = require("fs");

const createFile = async (base = 5, list, top) => {
  try {
    let table = "";
    for (let i = 1; i <= top; i++) {
      table += `${base} x ${i} = ${base * i}\n`;
    }
    if (list) {
      console.log(table);
    }

    fs.writeFileSync(`./output/table-${base}.txt`, table);

    return `table-${base}.txt`;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  createFile,
};
