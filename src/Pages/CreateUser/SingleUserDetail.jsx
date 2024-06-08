import { FormGroup, Input, InputLabel } from '@mui/material'
import React from 'react'
import useErrorMsg from './UseErrorMsg';
// import ErrorMsg from './ErrorMsg'

const SingleUserDetail = ({HandleChange , validationErrors , UserData , id , label }) => {

  const isError = useErrorMsg(validationErrors, id);

  return (
   
    <FormGroup style={{ width: "100%" }}>


 
      <InputLabel
        error={isError}
        sx={{
          textAlign: "left",
          color: "#6e6e6e",
        }}
        htmlFor={id}
      >
        {label ? label : id }
      </InputLabel>

      <Input
        error={isError}

        className="borderAfter"
        value={UserData.id}
        multiline={id=== "about" ? true : false}
        rows={id === "about" ? 4 : 1}
        id={id}
        fullWidth
        variant="standard"
        sx={{
          fontSize: ".8rem",
          paddingTop: "0",
        }}
        onChange={HandleChange}
        inputProps={{
          placeholder: "About you....",
          classes: {
            notchedOutline: {
              borderWidth: "1px",
              borderColor: "yellow !important",
            },
          },
        }}
      />
    </FormGroup>
  )
}

export default SingleUserDetail