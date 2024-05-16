import React, { useCallback, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import UseAuth from '../Components/Contexts/Authantication';
import { useCourseContext } from '../Components/Contexts/CourseContexts';
import { useAcademicYear } from '../Components/Contexts/AcadmicYearContext';

const Asynchronous = React.memo(() => {
  const { SelectedCourse, MainDrawerCourse } = useCourseContext();
  const { Data } = UseAuth();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [isInitialOpen, setIsInitialOpen] = useState(true);
  const { academicYears } = useAcademicYear();

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(`https://optima-software-solutions.com/apis/courseshow.php?userid=${Data.user.id}`);
      let filteredOptions = res.data.filter(option => option.academicyear !== null);

      // Filter options to include only those with a corresponding academic year in academicYears
      filteredOptions = filteredOptions.filter(option => {
        return academicYears.some(year => year.id === option.academicyear);
      });

      if (Data.user.access !== "Admin") {
        filteredOptions = filteredOptions.filter(option => option.status === "In Progress");
      }
      setOptions(filteredOptions);

      // Set the initial value of MainDrawerCourse to the first option in the options array
      if (filteredOptions.length > 0 && !MainDrawerCourse) {
        SelectedCourse(filteredOptions[0]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }, [Data.user.id, academicYears, Data.user.access, MainDrawerCourse, SelectedCourse]);

  useEffect(() => {
    if (open && options.length === 0 && isInitialOpen) {
      fetchData();
      setIsInitialOpen(false);
    }
  }, [fetchData, isInitialOpen, open, options.length]);

  const handleCourseChange = (event, newValue) => {
    SelectedCourse(newValue);
  };

  return (
    <Autocomplete
      value={MainDrawerCourse || (options.length > 0 && options[0])}
      onChange={handleCourseChange}
      id="asynchronous-demo"
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      isOptionEqualToValue={(option, value) => option?.coursename === value?.coursename}
      getOptionLabel={(option) => {
        const academicYear = academicYears.find(year => year.id === option.academicyear);
        if (academicYear) {
          return `${option.coursename} - ${academicYear.name}`;
        } else {
          return option.coursename;
        }
      }}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
          variant="standard"
          {...params}
          label="Courses"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading && <CircularProgress color="inherit" size={20} />}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
});

export default Asynchronous;

