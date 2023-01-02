import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { nanoid } from "nanoid";
import { CityItem } from "./AddCity";

interface CityItemsProps {
  cityItems: CityItem[];
}

export default function CityCards({ cityItems }: CityItemsProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        "& > :not(style)": {
          m: 2,
          width: 300,
          height: 300,
        },
      }}
    >
      {cityItems.map((item: CityItem) => (
        <Paper elevation={3} key={nanoid()}>
          <Box>{item.cityName}</Box>
          <Box>{item.temperature}</Box>
          <Box>{item.countryName}</Box>
          <Box>{item.weatherDecription}</Box>
          <Box>{item.weatherIcon}</Box>
        </Paper>
      ))}
    </Box>
  );
}
