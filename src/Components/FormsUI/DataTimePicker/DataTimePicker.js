import React from "react";
import { TextField } from '@mui/material';
import { useField } from 'formik';


const DataTimePicker= ({name, ...otherProps}) =>{

    const [field, meta] = useField(name);

    const configDataTimePicker = {
        ...field,
        ...otherProps,
        type: 'date',
        variant: 'outlined',
        fullWidth: true,
        InputLabelProps: {
            shrink: true
        }
    };


    if(meta && meta.touched && meta.error){
        configDataTimePicker.error=true;
        configDataTimePicker.helperText = meta.error;
    }


    return(<TextField
    {...configDataTimePicker}
    
    
    />);
}

export default DataTimePicker;