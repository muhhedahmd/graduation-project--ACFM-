import React from 'react';
import TextField from '@mui/material/TextField';
import { Autocomplete } from '@mui/material';

export default function CustomAutocomplete({  SetselectCourse, SetselectUser, options, id }) {
  const [filteredOptions, setFilteredOptions] = React.useState([]);
  const [selectedValues, setSelectedValues] = React.useState([]);

  React.useEffect(() => {
    // Update filtered options based on the provided options and id
    switch (id) {
      case 'Course':
        const allCourses = options.reduce((acc, curr) => {
          return acc.concat(curr.courses);
        }, []);
        setFilteredOptions(allCourses);
        break;
      case 'Users':
        setFilteredOptions(options.filter(option => option.fName && option.lName));
        break;
      default:
        setFilteredOptions(Array.isArray(options) ? options : []);
        break;
    }
  }, [options, id]);

  const handleAutocompleteChange = (event, newValue) => {
    setSelectedValues(newValue);
    if (id === 'Course') {
      SetselectCourse(newValue);
    } else if (id === 'Users') {
      SetselectUser(newValue);
    }
  };

  const getOptionLabel = (option) => {
    switch (id) {
      case 'Course':
        return `${option.courseName} ${option.courseCode}`;
      case 'Users':
        return `${option.fName || ''} ${option.lName || ''}`;
      default:
        return option.label ;
    }
  };

  return (
    <Autocomplete
      multiple={id === 'Course'}
      freeSolo={id !== 'Course'}
      id={id + 'Autocomplete'}
      options={filteredOptions}
      value={selectedValues}
      onChange={handleAutocompleteChange}
      getOptionLabel={getOptionLabel}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="standard"
          placeholder={id === 'Course' ? 'Select the courses' : id === 'Users' ?  'Select the user' : 'Select the courses' }
        />
      )}
    />
  );
}
