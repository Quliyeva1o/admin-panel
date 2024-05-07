import { Button, TextField } from "@mui/material";
import { useState } from "react";
import controller from "../../../services/index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { endpoints } from "../../../services/constants";
import { useNavigate, useOutletContext } from "react-router-dom";

const AddCountry = () => {
  
  const navigate = useNavigate();
  const data = useOutletContext();
  const setCountries = data[4];
  const [newCountry, setNewCountry] = useState({
    name: "",
    population: "",
    description: "",
    capital: "",
    flagImg: "",
  });
  function handleSubmit(e) {
    e.preventDefault();
    controller.post(endpoints.countries, newCountry);
    setCountries((currentCountries) => {
      return [...currentCountries, newCountry];
    });
    setTimeout(() => {
      navigate("/admin/countries");
    }, 1500);
    toast.success("new country added!", {
      autoClose: 1500,
    });
    setNewCountry({
      name: "",
      population: "",
      description: "",
      capital: "",
      flagImg: "",
    });
  }
  return (
    <>
      <form
        onSubmit={(e) => handleSubmit(e)}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "15px",
          marginTop: "200px",
        }}
      >
        <div>
          <TextField
            value={newCountry.name}
            onChange={(e) => {
              setNewCountry({ ...newCountry, name: e.target.value });
            }}
            id="outlined-basic"
            type="text"
            label="country name"
            variant="outlined"
            sx={{ marginRight: "10px" }}
          />
          <TextField
            value={newCountry.capital}
            onChange={(e) => {
              setNewCountry({ ...newCountry, capital: e.target.value });
            }}
            id="outlined-basic"
            type="text"
            label="country capital"
            variant="outlined"
          />
        </div>
        <div>
          <TextField
            value={newCountry.flagImg}
            onChange={(e) => {
              setNewCountry({ ...newCountry, flagImg: e.target.value });
            }}
            id="outlined-basic"
            type="text"
            label="country flag image source"
            variant="outlined"
            sx={{ marginRight: "10px" }}
          />
          <TextField
            value={newCountry.population}
            onChange={(e) => {
              setNewCountry({ ...newCountry, population: e.target.value });
            }}
            id="outlined-basic"
            type="number"
            min={0}
            label="country population"
            variant="outlined"
          />
        </div>
        <TextField
          value={newCountry.description}
          onChange={(e) => {
            setNewCountry({ ...newCountry, description: e.target.value });
          }}
          
          placeholder="country description"
          multiline
          rows={4}
          sx={{ width: "30%" }}
        />
        <Button variant="contained" type="submit" color="error">
          Add Country
        </Button>
      </form>
      <ToastContainer />
    </>
  );
};

export default AddCountry;
