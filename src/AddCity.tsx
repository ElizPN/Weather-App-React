import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import CityCards from "./CityCards";
import { useState } from "react";
import icon from "./icon-moon.png";
import Box from "@mui/material/Box";
import imgPlus from "./img/plus-circle.svg";

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
  const [err, setErr] = useState<string | null>(null);
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${apiKey}&units=metric`;

  const handeOnChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputValue(event.target.value);
  };

  const handleOnclick = () => {
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((weatherData) => {
        if (weatherData.cod === "404") {
          throw new Error(`${weatherData.cod}, ${weatherData.message}`);
        }
        const { weather, main, sys, name } = weatherData;

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
      })
      .catch(() => {
        setErr("Please search for a valid city!");
      });
    setErr("");
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
          size='small'
          value={inputValue}
          onChange={handeOnChange}
          fullWidth
          label='Search city or area '
          id='fullWidth'
        />
        <Box>{err}</Box>
      </Grid>
      <Grid item xs={2}>
        <Button
          onClick={handleOnclick}
          variant='outlined'
          sx={{ backgroundColor: "#EFA00B "}}
        >
          <img src={imgPlus} alt='Plus circle' />
        </Button>
      </Grid>
      <CityCards cityItems={cityItems} />
    </Grid>
  );
}
