import React, {  useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useAcademicYear } from '../../Components/Contexts/AcadmicYearContext';

const AcadmicYear = function({ initialValue, setAcadmicYearState }) {
const {
  academicYears
} = useAcademicYear()

  const [value, setValue] = useState(initialValue || '');



  const handleChange = (event ) => {
    const selectedValue = event.target.value;
    setValue(selectedValue);
    const x = academicYears.filter((item)=>item.name === selectedValue )
    setAcadmicYearState(x);

  };

  return (
    <div>
      <FormControl variant="standard" sx={{ minWidth: 150 }}>
        <InputLabel id="demo-simple-select-standard-label">Academic Year</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={value}
          onChange={handleChange}
          label="Academic Year"
        >
{academicYears.map((year, index) => {
  return (
    year.name && (
      <MenuItem key={year.id} value={year.name}>
        {year.name}
      </MenuItem>
    )
  );
})}
        </Select>
      </FormControl>
    </div>
  );
}

export default AcadmicYear;
