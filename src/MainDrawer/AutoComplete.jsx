import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import styled from "styled-components";
import {  Divider, ListItem, Typography } from "@mui/material";

const StyledAutocomplete = styled(Autocomplete)`
  .MuiAutocomplete-root {
    background-color: #c84800;
    color: white;
    border-radius: 8px; /* Adjust border radius as needed */
  }

  .MuiAutocomplete-inputRoot {
    color: white;
  }

  .MuiAutocomplete-option {
    color: #fff;
  }

  .MuiAutocomplete-option[data-focus="true"] {
    color: white;
  }

  .css-i4bv87-MuiSvgIcon-root {
    color: #fff;
  }
  .css-ptiqhd-MuiSvgIcon-root {
    color: #fff;
  }
  .MuiAutocomplete-hasPopupIcon.MuiAutocomplete-hasClearIcon.css-1h51icj-MuiAutocomplete-root
    .MuiAutocomplete-inputRoot {
    /* background-color: #c84800; */
  }

  .MuiAutocomplete-hasPopupIcon.MuiAutocomplete-hasClearIcon.css-1h51icj-MuiAutocomplete-root
    .MuiAutocomplete-inputRoot {
    /* background: #c84800; */
    padding: 0 0.3rem;
  }

  .hvxbMj .MuiAutocomplete-inputRoot {
    background: #c84800;
    border-radius: 8px;
  }
  .MuiAutocomplete-hasPopupIcon.MuiAutocomplete-hasClearIcon.css-1h51icj-MuiAutocomplete-root
    .MuiAutocomplete-inputRoot:hover
    .css-1hl2jvf-MuiInputBase-root-MuiInput-root::after {
    background: #ffff;
  }
  .css-1hl2jvf-MuiInputBase-root-MuiInput-root::after {
    background: #c84800;
    border-radius: 8px;
  }
  & .css-1ezwmti-MuiAutocomplete-root .MuiInput-root .MuiInput-input {
    padding: 4px 4px 4px 4px !important;
    font-size: 0.8rem;
    letter-spacing: 1px;
  }
  .css-2bwei5-MuiFormControl-root-MuiTextField-root {
    color: #0e0e0e9e
    /* background: #c84800; */
  }

  .css-1hl2jvf-MuiInputBase-root-MuiInput-root::before {
    border: none;
  }
  &:hover .css-1hl2jvf-MuiInputBase-root-MuiInput-root::before {
    border: none;
  }
  .MuiAutocomplete-input {
    font-size: 0.8rem;
    padding: 4px 4px 4px 6px !important;
    letter-spacing: 1px;
  }
  .gtchEd .css-2bwei5-MuiFormControl-root-MuiTextField-root {
    border-radius: 5px;
  }
  .css-7iolvi-MuiAutocomplete-listbox .MuiAutocomplete-option {
    /* background-color:"#c84800"; */
    font-size:".8rem";
    color:#fff;
    &[aria-selected='true']:not([disabled]){
      /* background-color:"#ff5722"; */
    }
    
  }
`;


export default function CustomAutocomplete({ options, isexpand}) {
  const [selected, setSelected] = useState(options[0]);
  return (
<>
{isexpand? 
    <StyledAutocomplete
      filterSelectedOptions
      value={selected}
      disableClearable
      autoSelect={true}
      sx={{
        fontSize: "1rem",
        "& .css-16d15bc-MuiInputBase-root-MuiInput-root::before": {
          border: "none",
        },
        "& .MuiAutocomplete-input": {
          fontSize: ".8rem",
          padding: "4px 4px 4px 6px !important",
          letterSpacing: "1px",
        },
        "& .MuiAutocomplete-root": {
          borderRadius: "10px",
        
        },
        ' .MuiAutocomplete-popper':{
          // backgroundColor:"#c84800"
        },
        '.MuiAutocomplete-paper':{
          // backgroundColor:"#c84800"
        },
        '.MuiAutocomplete-popper > *':{
          // backgroundColor:"#c84800"
        },
        '.MuiAutocomplete-option':{
          // backgroundColor:"#c84800"

        }
        
      }}
      componentsProps={{
        popper: {
          sx: {
            marginTop: "55px"
          }
        }
      }}

      autoHighlight
      options={options}
      getOptionLabel={(option) => option}
      renderInput={(params) => (
        <TextField
          sx={{
  
            fontSize: "1rem",
          }}
          {...params}
          variant="standard"
        />
      )}
        renderOption={(params , option)=>{
          return (
        <ListItem
        disablePadding
        onTouchStart={()=>{}}
        sx={{
          padding:" 0 0 .5rem",
          display:"flex",
          flexDirection:"column",
          justifyContent:"flex-start",
          alignItems:"flex-start"
        }}
         {...params.onMouseMove = null 
         
         
         }
         {...params 
         
         
         }
         >
        <Typography
        variant="caption"
        component="p"
        style={{
          padding:" 0 0 .5rem 0 ",
        

          width:"100%",
          // padding:"1rem",
          color:"#c84800"
        }}
        >

        {option}
        </Typography>
        <Divider
        
    sx={{
      width:"120%",
      bgcolor:"#c84800"
    }}


        />
        </ListItem>
          )
      }}
      onChange={(event, value) => {
        setSelected(value);
      }}
    />
:""
}

</>
  );
}
