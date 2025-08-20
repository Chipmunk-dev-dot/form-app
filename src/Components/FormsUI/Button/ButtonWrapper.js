import { Button } from '@mui/material'
import React, { useState } from 'react'
import { useFormikContext } from 'formik';

const ButtonWrapper = ({children,...otherProps}) => {


    const {submitForm}=useFormikContext();
    const handleSubmit=()=>{
        submitForm();
      
    }

    const configButton={
        variant: 'contained',
        color: 'secondary',
        fullWidth: true,
        onClick: handleSubmit
    }




  return (
    <Button  {...configButton}>
        {children}
    </Button>
  )
}

export default ButtonWrapper
