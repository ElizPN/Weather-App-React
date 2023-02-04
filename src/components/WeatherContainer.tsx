import CityCards from "./CityCards";
import { useState, useContext } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import AddCity from "./AddCity";
import { WeatherContext } from "./WeatherContextBox";

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

export function WeatherContainer({
  fetchWeatherData,
}: {
  fetchWeatherData: (cityValue: string) => Promise<any>;
}) {
  const [err, setErr] = useState<string | null>(null);
  const [sameCityMessage, setSameCityMessage] = useState<string>("");

  const { inputValue, setInputValue, cityItems, setCityItems } =
    useContext(WeatherContext);

  const handeOnChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputValue(event.target.value);
  };

  const handleOnclick = async () => {
    if (!inputValue) {
      return;
    }

    try {
      const weatherData = await fetchWeatherData(inputValue);
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
        setErr("");
      } else {
        const renderCityItems = [...cityItems];
        renderCityItems.push(cityItem);
        setCityItems(renderCityItems);
        setSameCityMessage("");
        setInputValue("");
        setErr("");
      }
    } catch (error) {
      console.log(error);
      setErr("Please search for a valid city!");
      setSameCityMessage("");
    }
  };

  return (
    <Box m={10}>
      <AddCity
        err={err}
        sameCityMessage={sameCityMessage}
        handeOnChange={handeOnChange}
        handleOnclick={handleOnclick}
      />
      <CityCards />
    </Box>
  );
}
