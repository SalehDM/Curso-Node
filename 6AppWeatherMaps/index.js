const { saveCity, readCities } = require("./helpers/file");

const {
  inquirerMenu,
  stop,
  addData,
  inquirerCity,
} = require("./helpers/inquirer");

const SearchCity = require("./models/cities");

const main = async () => {
  const search = new SearchCity();
  let option = "";
  //const cities = readCities();

  do {
    console.clear();

    option = await inquirerMenu();

    switch (option) {
      case 1:
        const newCity = await addData();

        const choises = await search.searchcities(newCity);

        llCity = await inquirerCity(choises);
        console.log(llCity);
        await stop();

        if (!llCity == 0) {
          const city = choises.find((c) => c.value === llCity);
          console.log(city);
          await stop();
          await search.readWeather(city);

          const cities = await readCities();
          console.log({ cities });
          await stop();
          const history = await search.historyCiyies(cities, city);
          saveCity(history);
        }

        break;
      case 2:
        const showCities = readCities();
        for (let i = 0; (i < showCities.length) & (i < 6); i++) {
          console.log(`${i + 1}. ${showCities[i]}`);
        }
        break;
    }

    console.log("\n");
    if (option !== 0) await stop();
  } while (option !== 0);
};

main();
