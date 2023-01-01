import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";

export function AddCity() {
  return (
    <Grid
      container
      sx={{
        width: 500,
        maxWidth: "100%",
        m: 10,
      }}
    >
      <Grid item xs={10}>
        <TextField fullWidth label='Search city or area ' id='fullWidth' />
      </Grid>
      <Grid item xs={2}>
        <Button variant='outlined'>Search</Button>
      </Grid>
    </Grid>
  );
}
