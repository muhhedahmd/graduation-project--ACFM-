import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { Autocomplete } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { useCourseContext } from '../Components/Contexts/CourseContexts';

export default function CustomAutocomplete({ SetselectCourse, SetselectUser, options, id }) {
  const { SelectedCourse } = useCourseContext();
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [selectedValues, setSelectedValues] = useState([]);
  const [loading, setLoading] = useState(true); // Initially, set loading to true

  useEffect(() => {
    // Check if options are available
    if (options.length > 0) {
      setLoading(false); // If options are available, set loading to false
      switch (id) {
        case 'Course':
          setFilteredOptions(options.filter(option => option.coursename && option.academicyear));
          break;
        case 'Users':
          setFilteredOptions(options.filter(option => option.first_name && option.last_name));
          break;
        default:
          setFilteredOptions(options.filter(option => option.coursename));
          break;
      }
    }
  }, [options, id]);

  const handleAutocompleteChange = (event, newValue) => {
    setSelectedValues(newValue);
    if (id === 'Course') {
      SetselectCourse(newValue);
    } else if (id === 'Users') {
      SetselectUser(newValue);
    } else if (id === 'mainDrawerOFMainDrawerCourses') {
      SelectedCourse(newValue);
    }
  };

  const getOptionLabel = (option) => {
    if (Array.isArray(option) && option.length === 0) {
      return '';
    }

    switch (id) {
      case 'Course':
        return `${option.coursename} ${option.academicyear}`;
      case 'Users':
        return `${option.first_name || ''} ${option.last_name || ''}`;
      default:
        return option.coursename || '';
    }
  };

  // Render loading indicator while fetching options
  if (loading) {
    return <CircularProgress />;
  }

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
          placeholder={id === 'Course' ? 'Select the courses' : id === 'Users' ? 'Select the user' : 'Select the courses'}
        />
      )}
    />
  );
}
