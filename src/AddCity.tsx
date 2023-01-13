import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { ChangeEventHandler, MouseEventHandler } from "react";
import imgPlus from "./img/plus-circle.svg";
import { StyledCardMessage } from "./WeatherContainer";

interface AddCityProps {
  inputValue: string;
  handeOnChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  err: string | null;
  sameCityMessage: string | null;
  handleOnclick: MouseEventHandler<HTMLButtonElement>;
}

export const AddCity = ({
  inputValue,
  handeOnChange,
  err,
  sameCityMessage,
  handleOnclick,
}: AddCityProps) => (
  <Grid container spacing={1} minWidth={500}>
    <Grid item xs={6} md={4} lg={4}>
      <TextField
        size='small'
        value={inputValue}
        onChange={handeOnChange}
        fullWidth
        placeholder='e.g. Stockholm'
        id='fullWidth'
      />
      {err && <StyledCardMessage>{err}</StyledCardMessage>}
      {sameCityMessage && (
        <StyledCardMessage>{sameCityMessage}</StyledCardMessage>
      )}
    </Grid>
    <Grid item xs={2}>
      <Button
        onClick={handleOnclick}
        variant='outlined'
        sx={{
          backgroundColor: "#EFA00B ",
          height: 40,
        }}
      >
        <img src={imgPlus} alt='Plus circle' />
      </Button>
    </Grid>
  </Grid>
);
