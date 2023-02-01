import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { ChangeEventHandler, MouseEventHandler, useContext } from "react";
import imgPlus from "../img/plus-circle.svg";
import { StyledCardMessage } from "./WeatherContainer";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import { WeatherContext } from "./WeatherContextBox";

interface AddCityProps {
  handeOnChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  err: string | null;
  sameCityMessage: string | null;
  handleOnclick: MouseEventHandler<HTMLButtonElement>;
}

export const StyledButton = styled(Button)(() => ({
  backgroundColor: "#EFA00B ",
  height: 40,
}));

export default function AddCity({
  handeOnChange,
  err,
  sameCityMessage,
  handleOnclick,
}: AddCityProps) {
  const { inputValue } = useContext(WeatherContext);

  return (
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
            inputProps={{
              "data-testid": "add-city-field",
            }}
          />
          {err && (
            <StyledCardMessage data-testid='404-error'>{err}</StyledCardMessage>
          )}
          {sameCityMessage && (
            <StyledCardMessage data-testid='same-city-message'>
              {sameCityMessage}
            </StyledCardMessage>
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
}
