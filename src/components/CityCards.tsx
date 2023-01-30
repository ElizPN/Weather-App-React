import Box from "@mui/material/Box";
import { nanoid } from "nanoid";
import { CityItem, CityItemsContext } from "./WeatherContainer";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { CardContent, CardHeader, Typography } from "@mui/material";
import { useContext } from "react";

export default function CityCards() {
const cityItems = useContext(CityItemsContext);

  return (
    <Grid container gap={2} mt={10}>
      {cityItems.map((item: CityItem, index) => (
        <Grid
          key={nanoid()}
          item
          data-testid={`city-card-${index}`}
          xs={6}
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
