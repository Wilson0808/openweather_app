import React, { useState } from "react";
import axios from "axios";

export default function SearchEngine() {
  const [city, setCity] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [weather, setWeather] = useState(null);

  function showWeather(response) {
    setLoaded(true);
    setWeather({
      temperature: response.data.main.temp,
      humidity: response.data.main.humidity,
      description: response.data.weather[0].description,
      wind: response.data.wind.speed,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    let key = `be2b1d571d2242daa7cb5a3c859e71bb`;
    let unit = `metric`;
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=${unit}`;
    axios.get(url).then(showWeather);
  }

  function cityUpdate(event) {
    setCity(event.target.value);
  }

  if (loaded) {
    return (
      <div>
        <form onSubmit={handleSubmit} className="SearchEngine">
          <input
            onChange={cityUpdate}
            type="search"
            placeholder="Type a city"
          />
          <input type="submit" value="search" />
        </form>
        <ul>
          <li>Temperature: {Math.round(weather.temperature)}°C</li>
          <li>Humidity: {weather.humidity}%</li>
          <li>Description: {weather.description}</li>
          <li>Wind speed: {weather.wind} km/h</li>
          <li>
            <img src={weather.icon} alt="weather icon" />
          </li>
        </ul>
      </div>
    );
  } else {
    return (
      <form onSubmit={handleSubmit} className="SearchEngine">
        <input onChange={cityUpdate} type="search" placeholder="Type a city" />
        <input type="submit" value="search" />
      </form>
    );
  }
}
