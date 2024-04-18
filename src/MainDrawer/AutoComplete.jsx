import * as React from 'react';
import TextField from '@mui/material/TextField';
import { Autocomplete } from '@mui/material';

export default function CustomAutocomplete({ options, id }) {
  const [filteredOptions, setFilteredOptions] = React.useState([]);

  React.useEffect(() => {
    // Update filtered options based on the provided options and id
    switch (id) {
      case 'Course':
        const allCourses = options.reduce((acc, curr) => {
          return acc.concat(curr.courses);
        }, []);
        setFilteredOptions(allCourses);
        break;
      default:
        setFilteredOptions(options);
        break;
    }
  }, [options, id]);

  const getOptionLabel = (option) => {
    switch (id) {
      case 'Course':
        return `${option.courseName} ${option.courseCode}`;
      case 'Users':
        // Assuming that the option has properties fName and lName
        return `${option.fName} ${option.lName}`;
      default:
        // Default case, if id is neither 'Course' nor 'Users'
        return option.label || '';
    }
  };

  return (
    <Autocomplete
      multiple={id === 'Course'}
      freeSolo={id !== 'Course'}
      id={id + 'Autocomplete'}
      options={filteredOptions}
      getOptionLabel={getOptionLabel}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="standard"
          placeholder={id === 'Course' ? 'Select the courses' : ''}
        />
      )}
    />
  );
}
