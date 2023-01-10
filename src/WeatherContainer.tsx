import CityCards from "./CityCards";
import {
  JSXElementConstructor,
  ReactElement,
  ReactFragment,
  ReactPortal,
  useState,
} from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import { fetchWeatherData } from "./weatherService";
import { AddCity } from "./AddCity";

export interface CityItem {
  cityName: string;
  temperature: number;
  countryName: string;
  weatherDecription: string;
  weatherIcon: string;
}

export const StyledCardMessage = styled(Card)(() => ({
  backgroundColor: "#162b47",
  color: "#efa00b",
  marginTop: 5,
  padding: 2,
}));

export function WeatherContainer() {
  const [inputValue, setInputValue] = useState<string>("");
  const [cityItems, setCictyItems] = useState<CityItem[]>([]);
  const [err, setErr] = useState<string | null>(null);
  const [sameCityMessage, setSameCityMessage] = useState<string>("");

  const handeOnChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputValue(event.target.value);
  };

  const handleOnclick = () => {
    if (!inputValue) {
      return;
    }

    fetchWeatherData(inputValue)
      .then((weatherData) => {
        if (weatherData.cod === "404") {
          throw new Error(`${weatherData.cod}, ${weatherData.message}`);
        }
        const { weather, main, sys, name } = weatherData;
        const icon = `img/weather-icons/${weather[0]["icon"]}.svg`;

        const cityItem = {
          cityName: name,
          temperature: Math.round(main.temp),
          countryName: sys.country,
          weatherDecription: weather[0].description,
          weatherIcon: icon,
        };

        // Get cardExists: ckeck if new card is already in CardList :
        const checkIsEqual = (curretCard: CityItem) =>
          name === curretCard.cityName;
        const cityItemsFiltered = cityItems.filter(checkIsEqual);
        const cardExists = cityItemsFiltered.length > 0;

        if (cardExists) {
          setSameCityMessage("The weather of this city is already shown 😉");
        } else {
          const renderCityItems = [...cityItems];
          renderCityItems.push(cityItem);
          setCictyItems(renderCityItems);
          setSameCityMessage("");
          setInputValue("");
        }

        // Add error message or add new card to CardList (depends on cardExists true or false)
      })
      .catch(() => {
        setErr("Please search for a valid city!");
      });
    setErr("");
    setInputValue("");
    setSameCityMessage("");
  };

  return (
    <Box m={10}>
      <AddCity
        inputValue={inputValue}
        err={err}
        sameCityMessage={sameCityMessage}
        handeOnChange={handeOnChange}
        handleOnclick={handleOnclick}
      ></AddCity>
      <CityCards cityItems={cityItems} />
    </Box>
  );
}
