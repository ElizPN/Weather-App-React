import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import CityCards from "./CityCards";
import { useState } from "react";

export function AddCity() {
  const [inputValue, setInputValue] = useState<string>("");
  const [cityItems, setCictyItems] = useState<string[]>([]);

  const handeOnChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputValue(event.target.value);
  };
  // Create copy of array and push new element(inputValue)
  const handleOnclick = () => {
    const renderCityItems = [...cityItems];
    renderCityItems.push(inputValue);
    setCictyItems(renderCityItems);
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
      {/* <CityCards renderCityItems={renderCityItems} /> */}
    </Grid>
  );
}
