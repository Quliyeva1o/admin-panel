import Container from "../../../components/Client/container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link, useOutletContext } from "react-router-dom";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useState } from "react";

const ClientCountries = () => {
  const [countries, setCountries] = useOutletContext();
  const [query, setQuery] = useState("");
  const filteredCountries = countries.filter((x) => {
    return x.name.toLowerCase().trim().includes(query.trim().toLowerCase());
  });

  return (
    <Container>
      <div style={{ display: "flex", gap: "18px", marginBottom: "30px" }}>
        <TextField
        onChange={(e)=>setQuery(e.target.value)}
          id="standard-basic"
          label="Search Country"
          variant="standard"
        />
        <FormControl sx={{ width: "200px" }}>
          <InputLabel id="demo-simple-select-label">Sort by Name</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={""}
            label="Age"
            onChange={() => {}}
          >
            <MenuItem disabled selected value={""}>
              Sort by Name
            </MenuItem>
            <MenuItem value={"a-z"}>A-Z</MenuItem>
            <MenuItem value={"z-a"}>Z-A</MenuItem>
          </Select>
        </FormControl>
      </div>
      <Grid container spacing={2}>
        {filteredCountries &&
          filteredCountries.map((country) => {
            return (
              <Grid key={country.id} item xs={12} sm={12} md={6} lg={3} xl={3}>
                <Card>
                  <CardMedia
                    sx={{ height: 160 }}
                    image={country.flagImg}
                    title={country.name}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {country.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <b>capital: </b> {country.capital}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <b>population: </b> {country.population}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">
                      <Link to={`/countries/${country.id}`}>Learn More</Link>
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
      </Grid>
    </Container>
  );
};

export default ClientCountries;
