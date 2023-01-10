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

export const AddCity = (props: AddCityProps) => (
  <Grid container spacing={1} minWidth={500}>
    <Grid item xs={6} md={4} lg={4}>
      <TextField
        size='small'
        value={props.inputValue}
        onChange={props.handeOnChange}
        fullWidth
        placeholder='e.g. Stockholm'
        id='fullWidth'
      />
      {props.err && <StyledCardMessage>{props.err}</StyledCardMessage>}
      {props.sameCityMessage && (
        <StyledCardMessage>{props.sameCityMessage}</StyledCardMessage>
      )}
    </Grid>
    <Grid item xs={2}>
      <Button
        onClick={props.handleOnclick}
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
