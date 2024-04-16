import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { memo } from 'react';

const AccessLevel = memo(forwardRef(function AccessLevel({ setAccessLevel ,  initialValue, ...props }, ref) {
  const [value, setValue] = useState(initialValue || '');

  const handleChange = (event) => {
    setValue(event.target.value);
    setAccessLevel(event.target.value);
  };

  useEffect(() => {
    setValue(initialValue || '');
  }, [initialValue]);

  useImperativeHandle(ref, () => ({
    getValue: () => value
  }), );

  return (
    <div>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Access</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={value}
          onChange={handleChange}
          label="Access"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"Admin"}>Admin</MenuItem>
          <MenuItem value={"Instructor"}>Instructor</MenuItem>
          <MenuItem value={"Staff"}>Staff</MenuItem>
          <MenuItem value={"Staff Management"}>Staff Management</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}))

export default AccessLevel;
