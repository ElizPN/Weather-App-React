import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { nanoid } from "nanoid";

interface CityItemsProps {
  cityItems: string[];
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
      {cityItems.map((cityItem: any) => (
        <Paper elevation={3} key={nanoid()}>
          {cityItem}
        </Paper>
      ))}
    </Box>
  );
}
