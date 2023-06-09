import { Button, Container, Grid } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Country, State } from "country-state-city";
const FormDetails = () => {
  const location = useLocation();
  const [data, setData] = useState({});
  const id = location.pathname.split("/")[2];
  //load data from backend of for a id
  useEffect(() => {
    axios
      .get(`http://localhost:8000/form/${id}`)
      .then((res) => setData(res.data.formData));
  }, [id]);
  const navigate = useNavigate();

  return (
    <Container
      maxWidth={"md"}
      sx={{ border: "1px solid black", marginTop: "30px" }}
    >
      <Grid container>
        <Grid item xs={6} padding={"20px"}>
          First Name :
        </Grid>
        <Grid item xs={6} padding={"20px"}>
          {data?.firstName}
        </Grid>
        <Grid item xs={6} padding={"20px"}>
          Last Name :
        </Grid>
        <Grid item xs={6} padding={"20px"}>
          {data?.lastName}
        </Grid>
        <Grid item xs={6} padding={"20px"}>
          Email :
        </Grid>
        <Grid item xs={6} padding={"20px"}>
          {data?.email}
        </Grid>
        <Grid item xs={6} padding={"20px"}>
          Country :
        </Grid>
        <Grid item xs={6} padding={"20px"}>
          {Country.getCountryByCode(data?.country)?.name}
        </Grid>
        <Grid item xs={6} padding={"20px"}>
          State :
        </Grid>
        <Grid item xs={6} padding={"20px"}>
          {State.getStateByCodeAndCountry(data?.state, data?.country)?.name}
        </Grid>
        <Grid item xs={6} padding={"20px"}>
          City :
        </Grid>
        <Grid item xs={6} padding={"20px"}>
          {data?.city}
        </Grid>
        <Grid item xs={6} padding={"20px"}>
          Gender:
        </Grid>
        <Grid item xs={6} padding={"20px"}>
          {data?.gender}
        </Grid>
        <Grid item xs={6} padding={"20px"}>
          D.O.B :
        </Grid>
        <Grid item xs={6} padding={"20px"}>
          {data?.dateOfBirth?.slice(0, 10).split("-").reverse().join("-")}
        </Grid>
        <Grid item xs={6} padding={"20px"}>
          Age :
        </Grid>
        <Grid item xs={6} padding={"20px"}>
          {data?.age} years
        </Grid>
        <Grid
          item
          xs={12}
          padding={"20px"}
          display={"flex"}
          justifyContent={"center"}
        >
          <Button
            color="info"
            size="large"
            padding="50px"
            variant="contained"
            onClick={() => {
              navigate("/");
            }}
          >
            Back
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default FormDetails;
