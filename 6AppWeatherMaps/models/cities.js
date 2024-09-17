const axios = require("axios");
require("dotenv").config();
const { v4: uuidv4 } = require("uuid");

class SearchCity {
  constructor() {
    this.history = [];
    this.tempCities = [];
  }

  get openWeatherCities() {
    return {
      limit: "5",
      appid: process.env.OPENCITY_KEY,
    };
  }

  get openWeather() {
    return {
      appid: process.env.OPENWEATHER_KEY,
      units: "metric",
      lang: "es",
    };
  }

  async searchcities(place = "") {
    try {
      const intance = await axios.create({
        baseURL: `http://api.openweathermap.org/geo/1.0/direct?q=${place}`,
        params: this.openWeatherCities,
      });

      const resp = await intance.get();

      this.tempCities = [{ name: "Cancelar", value: 0 }];

      await resp.data.forEach((place, index) =>
        this.tempCities.push({
          name: `${place.name}, ${place.state ? place.state + ", " : ""}${
            place.country
          }`,
          value: [place.lat, place.lon],
        })
      );

      return this.tempCities;
    } catch (error) {
      return [];
    }
  }

  async readWeather(city) {
    try {
      const intanceRead = axios.create({
        baseURL: `https://api.openweathermap.org/data/2.5/weather?lat=${city.value[0]}&lon=${city.value[1]}`,
        params: this.openWeather,
      });

      const respRead = await intanceRead.get();

      console.clear(),
        console.log(`\n++Información de la ciudad++\n
        Ciudad: ${city.name}\n
        Latitud: ${city.value[0]}\n
        Longitud: ${city.value[1]}\n
        Estado del clima: ${respRead.data.weather[0].description}\n
        Temperatura: ${respRead.data.main.temp}\n
        Temperatura máxima: ${respRead.data.main.temp_max}\n
        Temperatura mínima: ${respRead.data.main.temp_min}`);
    } catch (error) {
      return [];
    }
  }

  async historyCiyies(cities, city) {
    this.history = cities;
    //city = [city];

    const a = cities.includes(city.name);
    console.log({ a });

    if (!this.history.includes(city.name)) {
      //cities.push(city);
      this.history.push(city.name);
    }

    console.log(this.history);

    return this.history;
  }
}

module.exports = SearchCity;
