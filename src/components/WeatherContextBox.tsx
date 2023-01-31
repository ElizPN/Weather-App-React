import { useState, createContext } from "react";
import { fetchWeatherData } from "../services/weatherService";
import { CityItem, WeatherContainer } from "./WeatherContainer";

interface WeatherContextType {
  inputValue: string;
  setInputValue: (value: string) => void;
  cityItems: CityItem[];
  setCictyItems: (value: CityItem[]) => void;
}

export const WeatherContext = createContext<WeatherContextType>(
  {} as WeatherContextType
);

export function WeatherContextBox() {
  const [inputValue, setInputValue] = useState<string>("");
  const [cityItems, setCictyItems] = useState<CityItem[]>([]);

  const contextValue = { inputValue, setInputValue, cityItems, setCictyItems };

  return (
    <WeatherContext.Provider value={contextValue}>
      <WeatherContainer fetchWeatherData={fetchWeatherData} />
    </WeatherContext.Provider>
  );
}
