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
  const [sameCityMessage, setSameCityMessage] = useState<string>("");

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

        // Get cardExists: ckeck if new card is already in CardList :
        // Loop over CardList and check if newCard equals current card, then set cardExists to true

        const checkIsEqual = (curretCard: CityItem ) =>
          name === curretCard.cityName

         const cityItemsFiltered =  cityItems.filter(checkIsEqual);
  
         const cardExists = cityItemsFiltered.length > 0 

        if (cardExists) {
          setSameCityMessage("You know the weather of this city");
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
  };

  return (
    <Box m={10}>
      <Grid container spacing={1}>
        <Grid item xs={6} md={4} lg={4}>
          <TextField
            size='small'
            value={inputValue}
            onChange={handeOnChange}
            fullWidth
            placeholder='e.g. Stockholm'
            id='fullWidth'
          />
          <Box>{err}</Box>
          <Box>{sameCityMessage}</Box>
        </Grid>
        <Grid item xs={2}>
          <Button
            onClick={handleOnclick}
            variant='outlined'
            sx={{ backgroundColor: "#EFA00B ", height: 40 }}
          >
            <img src={imgPlus} alt='Plus circle' />
          </Button>
        </Grid>
      </Grid>
      <CityCards cityItems={cityItems} />
    </Box>
  );
}
