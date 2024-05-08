import React, { useState, useEffect,  } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const AccessLevel = function AccessLevel({ error,   setAccessLevel ,    initialValue,  }) {
  const [value, setValue] = useState(initialValue || '');

  const handleChange = (event) => {
    setValue(event.target.value);
    setAccessLevel(event.target.value);
  };

  useEffect(() => {
    setValue(initialValue || '');
  }, [initialValue]);

  return (
    <div>
      <FormControl variant="standard" sx={{  minWidth: 120 }}>
        <InputLabel
        error={error}
         id="demo-simple-select-standard-label">Access</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={value}
          onChange={handleChange}
          label=""
        >
  
          <MenuItem value={"Admin"}>Admin</MenuItem>
          <MenuItem value={"Instructor"}>Instructor</MenuItem>
          <MenuItem value={"Staff"}>Staff</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

export default AccessLevel;
