import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { nanoid } from "nanoid";
import { CityItem } from "./AddCity";
import Grid from "@mui/material/Grid";

interface CityItemsProps {
  cityItems: CityItem[];
 
}

export default function CityCards({ cityItems}: CityItemsProps) {
  return (
    <Grid container gap={2} mt={10}>
      {cityItems.map((item: CityItem) => (
        <Grid key={nanoid()} item xs={6} md={4} lg={3}>
          <Paper elevation={3}>
            <Box>{item.cityName}</Box>
            <Box>{item.temperature} °C</Box>
            <Box>{item.countryName}</Box>
            <Box>{item.weatherDecription}</Box>
            <Box>{item.weatherIcon}</Box>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}
