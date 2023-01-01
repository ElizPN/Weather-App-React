import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import CityCard from "./CityCard";
import { useState } from "react";

export function AddCity() {
  const [inputValue, setInputValue] = useState<string>("");

  const handeOnChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputValue(event.target.value);
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
        <Button variant='outlined'>Search</Button>
      </Grid>
      <CityCard />
    </Grid>
  );
}
