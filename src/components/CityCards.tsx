import Box from "@mui/material/Box";
import { nanoid } from "nanoid";
import { CityItem } from "./WeatherContainer";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { CardContent, CardHeader, Typography } from "@mui/material";
import { useContext } from "react";
import { WeatherContext } from "./WeatherContextBox";

export default function CityCards() {
  const { cityItems } = useContext(WeatherContext);

  return (
    <Grid container gap={1} mt={10}>
      {cityItems.map((item: CityItem, index) => (
        <Grid
          key={nanoid()}
          item
          data-testid={`city-card-${index}`}
          xs={12}
          sm={4}
          md={4}
          lg={3}
        >
          <Card>
            <CardHeader title={item.cityName} subheader={item.countryName} />
            <CardContent>
              <Typography variant='h3'>{item.temperature} °C</Typography>
              <Typography color='textSecondary' variant='h6'>
                {item.weatherDecription}
              </Typography>
            </CardContent>

            <Box>
              <img src={item.weatherIcon} alt='weatherIcon' />
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
