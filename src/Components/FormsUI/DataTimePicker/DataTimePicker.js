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


    return(<TextField sx={{backgroundColor: "#ffffff36", borderRadius: '8px','& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#bdbdbd'

      },
      
     
    }}}
    {...configDataTimePicker}
    
    
    />);
}

export default DataTimePicker;