import { FormGroup, Input, InputLabel } from '@mui/material'
import React from 'react'
// import ErrorMsg from './ErrorMsg'

const SingleUserDetail = ({HandleChange , validationErrors , UserData , id , lable }) => {

  return (
   
    <FormGroup style={{ width: "100%" }}>


 
      <InputLabel
        // error={isError}
        sx={{
          textAlign: "left",
          color: "#6e6e6e",
        }}
        htmlFor={id}
      >
        {lable ? lable : id }
      </InputLabel>

      <Input
        className="borderAfter"
        value={UserData[id]}
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