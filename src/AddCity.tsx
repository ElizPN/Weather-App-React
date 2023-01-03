import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import CityCards from "./CityCards";
import { useState } from "react";
import icon from "./icon-moon.png";

const apiKey = "936a43fe9c1da3254004f3c7a1c14348";

export interface CityItem {
  cityName: string;
  temperature: number;
  countryName: string;
  weatherDecription: string;
  weatherIcon: string;
}

export function AddCity() {
  const [inputValue, setInputValue] = useState<string>("");
  const [cityItems, setCictyItems] = useState<CityItem[]>([]);
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${apiKey}&units=metric`;

  const handeOnChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputValue(event.target.value);
  };

  const handleOnclick = () => {
    fetch(url)
      .then((response) => response.json())
      .then((weatherData) => {
        const { weather, main, sys, name } = weatherData;

        // const icon = `img/weather-icons/${weather[0].icon}.svg`;
        //     const icon = "img/weather-icons/01n.svg";
        // console.log(typeof icon);

        const cityItem = {
          cityName: name,
          temperature: Math.round(main.temp),
          countryName: sys.country,
          weatherDecription: weather[0].description,
          weatherIcon: icon,
        };

        const renderCityItems = [...cityItems];
        renderCityItems.push(cityItem);
        setCictyItems(renderCityItems);
        console.log(cityItems);
      });
  };

  return (
    <Grid
      container
      sx={{
        width: 500,
        maxWidth: "100%",
        m: 10,
      }}
    >
      <Grid item xs={10}>
        <TextField
          value={inputValue}
          onChange={handeOnChange}
          fullWidth
          label='Search city or area '
          id='fullWidth'
        />
      </Grid>
      <Grid item xs={2}>
        <Button onClick={handleOnclick} variant='outlined'>
          Search
        </Button>
      </Grid>
      <CityCards cityItems={cityItems} />
    </Grid>
  );
}
