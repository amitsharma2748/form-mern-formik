import { Typography } from "@mui/material";
import React from "react";

const TextError = (props) => {
  return <Typography color="error">{props.children}</Typography>;
};

export default TextError;
