import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

// interface cityItemProps {
//   cityItem: string;
// }
export default function CityCards() {
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
      <Paper elevation={3}>{}</Paper>
    </Box>
  );
}
