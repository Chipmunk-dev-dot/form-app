import React from "react";
import { MenuItem, TextField } from "@mui/material";
import { useField, useFormikContext } from "formik";

const Selector = ({ name, options, ...otherProps }) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);

  const handleChange = (event) => {
    const value = event.target.value; // or const {value} = event.target;
    setFieldValue(name, value);
  };

  const configSelect = {
    ...field,
    ...otherProps,
    select: true,
    variant: "outlined",
    fullWidth: true,
    onChange: handleChange,
  };

  if (meta && meta.touched && meta.error) {
    configSelect.error = true;
    configSelect.helperText = meta.error;
  }
  return (
    <TextField sx={{backgroundColor: "#ffffff34", borderRadius: '8px', '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#bdbdbd'

      },
      
    }}}{...configSelect}>
      {Object.keys(options)?.map((item, pos) => {
        return (
          <MenuItem key={pos} value={item}>
            {options[item]}
          </MenuItem>
        );
      })}
    </TextField>
  );
};

export default Selector;
