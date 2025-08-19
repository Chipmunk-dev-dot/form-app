import React from "react";
import { TextField } from "@mui/material";
import { useField, validateYupSchema } from "formik";

const TextFieldW = ({ name, ...otherProps }) => {
  const [field, meta] = useField(name);
  const configTextfield = {
    ...field,
    ...otherProps,
    fullWidth: true,
    variant: "outlined",

  };
  //we are going to check if the meta object contains meta.touched and meta.error
  if(meta && meta.touched && meta.error){
    configTextfield.error=true;
    configTextfield.helperText =meta.error;//for the error message
  }
  return <TextField {...configTextfield} />;
};

export default TextFieldW;
