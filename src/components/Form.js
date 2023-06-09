import {
  Box,
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Country, State, City } from "country-state-city";
import "./Form.css";
import TextError from "./TextError.js";
import { Formik, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const FormField = () => {
  const [dataCountries, setDataCountries] = useState([]);
  const [dataState, setDataState] = useState([]);
  const [dataCity, setDataCity] = useState([]);

  const validationSchema = yup.object().shape({
    firstName: yup.string().required("Required"),
    lastName: yup.string().required("Required"),
    email: yup.string().email().required("Required"),
    country: yup.string().required("Required"),
    state: yup.string().required("Required"),
    city: yup.string().required("Required"),
    dateOfBirth: yup.date().required("Required"),
  });
  const formRef = useRef();
  const navigate = useNavigate();
  //to call when changes in Country value is there
  const changeHandle = (e) => {
    formRef.current.setFieldValue("country", e.target.value);
    setDataState(
      State.getAllStates().filter((item) => item.countryCode === e.target.value)
    );
  };
  //to call when changes in state value is there
  const handleChangeState = (e) => {
    formRef.current.setFieldValue("state", e.target.value);
    setDataCity(
      City.getAllCities().filter((item) => item.stateCode === e.target.value)
    );
  };
  //func to calculate Age
  const calculateAge = (birthDate) => {
    const currentDate = new Date();

    const birthYear =
      typeof birthDate === "string" ? birthDate?.slice(0, 4) : null;
    const birthMonth =
      typeof birthDate === "string" ? birthDate?.slice(5, 7) : null;
    const birthDay =
      typeof birthDate === "string" ? birthDate?.slice(8, 10) : null;

    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const currentDay = currentDate.getDate();

    let age = currentYear - birthYear;

    if (
      currentMonth < birthMonth ||
      (currentMonth === birthMonth && currentDay < birthDay)
    ) {
      age--;
    }

    return age;
  };
  const initialValue = {
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    state: "",
    city: "",
    gender: "Male",
    dateOfBirth: Date.now(),
    age: "",
  };
  useEffect(() => {
    setDataCountries(Country.getAllCountries());
  }, []);

  return (
    <Box width={"80%"} margin={"auto"} marginTop={"150px"}>
      <fieldset component="fieldset">
        <legend>
          <Typography variant="h3" color={"Highlight"}>
            Jean-François H
          </Typography>
        </legend>
        <Box>
          {" "}
          <Formik
            initialValues={initialValue}
            innerRef={formRef}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              await axios
                .post("http://localhost:8000/form", values) //post the form
                .then((res) => {
                  navigate(`/details/${res?.data?.formData?._id}`);
                })

                .catch((err) => console.log(err));

              setTimeout(() => {
                setSubmitting(false);
              }, 400);
            }}
          >
            {({ isSubmitting, handleChange, setFieldValue, values }) => (
              <Form>
                <Grid container spacing={5}>
                  <Grid item xs={12} sm={6} md={4}>
                    <TextField
                      variant="outlined"
                      label="First Name"
                      type="text"
                      name="firstName"
                      onChange={handleChange}
                      fullWidth
                    />
                    <ErrorMessage name="firstName" component={TextError} />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <TextField
                      variant="outlined"
                      label="Last Name"
                      type="text"
                      name="lastName"
                      onChange={handleChange}
                      fullWidth
                    />
                    <ErrorMessage name="lastName" component={TextError} />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <TextField
                      variant="outlined"
                      label="Email"
                      type="email"
                      name="email"
                      onChange={handleChange}
                      fullWidth
                    />

                    <ErrorMessage name="email" component={TextError} />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <InputLabel id="demo-simple-select-label" size="normal">
                      Country
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Countries"
                      name="countries"
                      defaultValue={"country"}
                      fullWidth
                      onChange={(e) => {
                        changeHandle(e);
                      }}
                    >
                      <MenuItem value={"country"}>Select a Country</MenuItem>
                      {dataCountries.map((item) => (
                        <MenuItem value={item.isoCode}>{item.name}</MenuItem>
                      ))}
                    </Select>
                    <ErrorMessage name="countries" component={TextError} />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <InputLabel id="demo-simple-select-label" size="normal">
                      State
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="State"
                      name="state"
                      defaultValue={"state"}
                      fullWidth
                      onChange={(e) => {
                        handleChangeState(e);
                      }}
                    >
                      <MenuItem value={"state"}>Select a State</MenuItem>
                      {dataState.map((item) => (
                        <MenuItem value={item.isoCode}>{item.name}</MenuItem>
                      ))}
                    </Select>
                    <ErrorMessage name="countries" component={TextError} />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <InputLabel id="demo-simple-select-label" size="normal">
                      City
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="City"
                      name="city"
                      defaultValue={"city"}
                      fullWidth
                      onChange={handleChange}
                    >
                      <MenuItem value={"city"}>Select a City</MenuItem>
                      {dataCity.map((item) => (
                        <MenuItem value={item.name}>{item.name}</MenuItem>
                      ))}
                    </Select>
                    <ErrorMessage name="countries" component={TextError} />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <InputLabel id="demo-simple-select-label" size="normal">
                      Gender
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="gender"
                      name="gender"
                      defaultValue={"Gender"}
                      placeholder="Gender"
                      fullWidth
                      onChange={handleChange}
                    >
                      {" "}
                      <MenuItem value={"Gender"}>Select a Gender</MenuItem>
                      <MenuItem value={"Male"}>Male</MenuItem>
                      <MenuItem value={"Female"}>Female</MenuItem>
                    </Select>
                    <ErrorMessage name="countries" component={TextError} />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <InputLabel id="demo-simple-select-label" size="normal">
                      D.O.B
                    </InputLabel>

                    <TextField
                      type="date"
                      name="dateOfBirth"
                      variant="outlined"
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => {
                        handleChange(e);
                        setFieldValue("age", calculateAge(e.target.value));
                      }}
                      fullWidth
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    display={"flex"}
                    alignItems={"center"}
                  >
                    <TextField
                      type="number"
                      name="age"
                      variant="outlined"
                      label="Age(years)"
                      fullWidth
                      value={values?.age}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      variant="contained"
                      color="success"
                      size="large"
                    >
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Box>
      </fieldset>
    </Box>
  );
};

export default FormField;
