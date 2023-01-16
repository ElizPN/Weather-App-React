import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { ChangeEventHandler, MouseEventHandler } from "react";
import imgPlus from "../img/plus-circle.svg";
import { StyledCardMessage } from "./WeatherContainer";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";
import { Container } from "@mui/system";

interface AddCityProps {
  inputValue: string;
  handeOnChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  err: string | null;
  sameCityMessage: string | null;
  handleOnclick: MouseEventHandler<HTMLButtonElement>;
}

export const StyledButton = styled(Button)(() => ({
  backgroundColor: "#EFA00B ",
  height: 40,
}));

export const AddCity = ({
  inputValue,
  handeOnChange,
  err,
  sameCityMessage,
  handleOnclick,
}: AddCityProps) => (
  <Container>
    <Typography
      data-testid='title'
      sx={{ fontWeight: "bold", marginBottom: 5, fontSize: "2.375rem" }}
      variant='h4'
    >
      {" "}
      Add location
    </Typography>
    <Grid container spacing={1} minWidth={500}>
      <Grid item xs={6} md={4} lg={4}>
        <TextField
          size='small'
          value={inputValue}
          onChange={handeOnChange}
          fullWidth
          placeholder='e.g. Stockholm'
          id='fullWidth'
          data-testid='add-city-field'
        />
        {err && <StyledCardMessage>{err}</StyledCardMessage>}
        {sameCityMessage && (
          <StyledCardMessage>{sameCityMessage}</StyledCardMessage>
        )}
      </Grid>
      <Grid item xs={2}>
        <StyledButton
          onClick={handleOnclick}
          variant='outlined'
          data-testid='add-button'
        >
          <img src={imgPlus} alt='Plus circle' />
        </StyledButton>
      </Grid>
    </Grid>
  </Container>
);
