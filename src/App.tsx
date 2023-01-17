import React from "react";
import { WeatherContainer } from "./components/WeatherContainer";
import { fetchWeatherData } from "./services/weatherService";


import "./App.css";

function App() {
  return <WeatherContainer fetchWeatherData={fetchWeatherData} />;
}

export default App;
