import React, { useState,   } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const SemsterOptions = () => {
  const [value, setValue] = useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };



  return (
    <div>
      <FormControl variant="standard" sx={{  
        position:"absolute",
        top:"1rem",
        right:"1rem",
        zIndex:"1000",    
    
         minWidth: 120 }}>
        <InputLabel
        // error={error}
        sx={{ color: '#333 !important' }} // Label text color

         id="demo-simple-select-standard-label">Semster</InputLabel>
        <Select

          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={value}
          onChange={handleChange}
          label="Semster"
        >
          <MenuItem value="Fall">
          </MenuItem>
          <MenuItem value={"Fall"}>Fall</MenuItem>
          <MenuItem value={"Spring"}>Spring</MenuItem>
          <MenuItem value={"Summer"}>Summer</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

export default SemsterOptions;
