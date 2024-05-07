import Container from "../../../components/Client/container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useOutletContext, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const ClientCountryDetail = () => {
  const { id } = useParams();
  const [countries] = useOutletContext();
  const [country, setCountry] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    setCountry(countries.find((x) => x.id == id));
  }, [id, countries]);
  return (
    <>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <Card>
              <CardMedia
                sx={{ height: 240 }}
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
                <Typography variant="body2" color="text.secondary">
                  <b>description: </b> {country.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">
                  <Button
                    onClick={() => {
                      navigate(-1);
                    }}
                  >
                    go back
                  </Button>
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default ClientCountryDetail;
